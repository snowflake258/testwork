from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from client.views import IndexView


urlpatterns = [
    path('', IndexView.as_view())
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
