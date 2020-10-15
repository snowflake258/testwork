from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView, Response
from api.models import User
from api.serializers import UserSerializer, UserCreateSerializer, TransferMoneySerializer


class UserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        serializers = UserCreateSerializer(data=request.data)

        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response({
                'success': True,
                'message': 'Пользователь зарегестрирован.'
            })
        else:
            return Response({
                'success': False,
                'errors': serializers.errors
            })


class UserSignleView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TransferMoneyView(APIView):
    def post(self, request):
        serializer = TransferMoneySerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({
            'success': True,
            'message': 'Перевод денег выполнен успешно.'
        })
