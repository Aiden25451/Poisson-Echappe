# forms.py
from django import forms


class ScoreForm(forms.Form):
    name = forms.CharField(max_length=200)
    time = forms.CharField(max_length=10)

    def clean_time(self):
        cleaned_data = self.cleaned_data["time"]

        total = cleaned_data.split(":")
        result = total[0] + total[1]

        return result
