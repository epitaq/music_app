"""
WSGI config for mysite project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

# import os

# from django.core.wsgi import get_wsgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

# application = get_wsgi_application()

# https://qiita.com/Daisuke0209/items/059b0c53283dcf6536e8 より
# https://qiita.com/neco0128_/items/5c637025c2ed6db5d80d 変わったらしい？
import os
# from dj_static import Cling
from django.core.wsgi import get_wsgi_application
# from whitenoise.django import DjangoWhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

# application = Cling(get_wsgi_application())

application = get_wsgi_application()
# application = DjangoWhiteNoise(application)
