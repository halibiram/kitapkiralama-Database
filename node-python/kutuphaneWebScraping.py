from base64 import decode
from distutils.log import error
import requests
from bs4 import BeautifulSoup
import urllib.request
import string
import random
import sys
import os
sys.stdout.reconfigure(encoding='utf-8')
bookInfo=[] #returnde tum objelerinde oldugu dizi
def checkInfo(info):
    
    if(len(info)<4):
        for i in range(4-len(info)):
            info='0'+info
    return info

def createRandomName(): # rastgele isim olusturucu
    characters = ""
    qrname = ""
    for letter in string.ascii_letters:
        characters += letter
    for number in range(0, 10):
        characters += str(number)
    for i in range(20):
        index = random.randrange(0, 61)

        qrname += characters[index]
    return qrname
def basla(info):
    
    info=checkInfo(info)
    
    url='http://85.99.108.162/yordam/sayfa/detay.php?dil=0&demirbas=000'+info+'&kiosk=0&q=*&tip=&webYayin=%2Fyordam'
    res=requests.get(url)
        
       
    bookInfo.append({'infoNumber':info})

                
    # print("The status code is", res.status_code)
    bookInfo.append({'statusCode':res.status_code})


    findWord=['Eser Adı','Yazar','Sorumlular','Yayın Tarihi','Yayınlayan','Yayın Yeri','Konu','Dil','ISBN','Notlar','Fiziksel Nitelik']




    wordIndex=[]
    rightWordIndex=[]
    newFindWord=[]
    words=[]
    image_url=''

    soup_data = BeautifulSoup(res.content, 'html.parser')
    
    titles = soup_data.find_all("table",{"class":'table table-sm bilgiler'})



 
    
        
    #resimi kayit etme
    try:
        for imgtag in soup_data.find_all("img",{'class':'img-fluid'}): #img taginda resmi url bulma
    #   print(imgtag['src'])
            image_url =imgtag['src']

    

    

        
        fileName =createRandomName()+".jpg"
        filePath ='./bookImages/'
        imageName =os.path.join(filePath,fileName)
    
        urllib.request.urlretrieve(image_url,imageName)
        bookInfo.append({"image_path":imageName})
        #kitap bilgileri ayiklama
        for i in titles:
            Eser=i.text;

        ##print(Eser)
        for find in findWord:
            try:
                wordIndex.append(Eser.index(find))
                
                if(Eser.index(find)):
                    newFindWord.append(find)
            except:
                
                bookInfo.append({find:'yok'})


        for index in range(len(wordIndex)-1):

            word=Eser[wordIndex[index]:wordIndex[index+1]]

            # print(newFindWord[index],word.replace(newFindWord[index],''))
            key=newFindWord[index].replace(' ','_').replace('ı','i').lower()
            bookInfo.append({key:word.replace(newFindWord[index],'')})

            # words.append(word.replace(newFindWord[index],''))


        for i in soup_data.find_all("td", {"data-alan": '_konu'}):
            konular=i.getText('--')
            
            bookInfo.append({'konular': konular[0:len(konular)-3] })
        return bookInfo
    except:
        return error
        


    

    

    
bookInfo=basla(sys.argv[1])
for info in bookInfo:
    for key,value in info.items():
        print(key)
       
        print(value)
    


    


#print(soup_data.prettify())
#print("\n")

#print(soup_data.find('class'))