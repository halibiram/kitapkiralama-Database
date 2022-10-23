import qrcode
import string
import random
import sys

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


qr =qrcode.QRCode(
    version=3,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
info = sys.argv[1]

qr.add_data(info)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")

qrname = createRandomName()


qrcode_path ="./qrcodes"


qrname += ".png"

print(qrname)
img.save(f"{qrcode_path}/{qrname}")
##img.show()

