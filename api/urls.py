from django.urls import path
from api.views import UserListView, UserView, TransferMoneyView


urlpatterns = [
    path('user/', UserListView.as_view()),
    path('user/<int:pk>/', UserView.as_view()),
    path('transfer-money/', TransferMoneyView.as_view())
]
