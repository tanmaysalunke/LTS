

# Create your models here.
#from django.contrib.gis.db import models

#class Shop(models.Model):
#    name = models.CharField(max_length=100)
#    location = models.PointField()
#    address = models.CharField(max_length=100)
#    city = models.CharField(max_length=50)

from django.db import models
from django_google_maps import fields as map_fields

class Rental(models.Model):
    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100)