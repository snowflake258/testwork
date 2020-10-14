from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    INT = models.CharField(max_length=50, unique=True, null=False, blank=False)
    account = models.DecimalField(max_digits=10, decimal_places=2, null=False)

    REQUIRED_FIELDS = ['email', 'INT', 'account']

    class Meta:
        db_table = 'auth_user'
