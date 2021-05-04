from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
import requests

# def home(request):
# 	api_path = 'http://127.0.0.1:5000/api/test'
#     response = requests.get('http://127.0.0.1:5000/api/test/')
#  	data = response.json()
#     return render(request, './template/content.blade.html', {
#         'text': data
# })

def content(request):
    response = requests.get('http://127.0.0.1:5000/api/test')
    geodata = response.json()
    return render(request, './templates/layouts/content.blade.html', {
        'data': geodata
    })



# Create your views here.
def index(request):
    header_str = "Heooll"
    # template = loader.get_template('index.html')
    context = {
        'var1' : header_str
	}
    # return HttpResponse(template.render(context,request))
    return render(request,'index.html',{
		'testdata': context
	})

def retrain(request):
    return render(request,'retrain.html')

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def save_image(request):
	if request.POST:
		# save it somewhere
		f = open(settings.MEDIA_ROOT + '/webcamimages/someimage.jpg', 'wb')
		f.write(request.raw_post_data)
		f.close()
		# return the URL
		return HttpResponse('http://localhost:8080/site_media/webcamimages/someimage.jpg')
	else:
		return HttpResponse('no data')

### CONNECT API ###
