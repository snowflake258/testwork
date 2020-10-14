from rest_framework.serializers import ModelSerializer, Serializer, CharField, EmailField, ListField, DecimalField, ValidationError
from api.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'INT', 'account')


class UserCreateSerializer(Serializer):
    username = CharField(max_length=150)
    email = EmailField()
    password = CharField()
    INT = CharField(max_length=50)
    account = DecimalField(max_digits=10, decimal_places=2)

    def create(self, validated_data):
        user = User()
        user.username = validated_data['username']
        user.email = validated_data['email']
        user.set_password(validated_data['password'])
        user.INT = validated_data['INT']
        user.account = validated_data['account']
        user.save()
        return user


class TransferMoneySerializer(Serializer):
    INT_source = CharField()
    INT_recipients = ListField(child=CharField())
    money = DecimalField(max_digits=10, decimal_places=2)

    def validate(self, data):
        try:
            self.source_user = User.objects.get(INT=data['INT_source'])
        except User.DoesNotExist:
            raise ValidationError("Пользователя с ИНН '{}' не существует.".format(data['INT_source']))

        self.recipients = User.objects.filter(INT__in=data['INT_recipients'])
        for item in data['INT_recipients']:
            if not self.recipients.filter(INT=item).exists():
                raise ValidationError("Пользователя с ИНН '{}' не существует.".format(item))

        if self.source_user.account < data['money']:
            raise ValidationError('У пользователя с ИНН "{}" недостаточно денег на счёте.'.format(self.source_user.INT))

        return data

    def create(self, validated_data):
        money_for_recipient = validated_data['money'] / self.recipients.count()

        self.source_user.account -= validated_data['money']
        self.source_user.save()

        for item in self.recipients:
            item.account += money_for_recipient
            item.save()

        return validated_data
