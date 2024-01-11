from django.db import models


# Create your models here.
class Score(models.Model):
    name = models.CharField(max_length=200)
    time = models.IntegerField()

    def __str__(self):
        return self.name
