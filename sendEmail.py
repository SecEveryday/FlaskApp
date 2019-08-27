from io import BytesIO
import email, smtplib, ssl
import os
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import logging 
#Create and configure logger 
logging.basicConfig(filename="server.log", 
                    format='%(asctime)s %(message)s', 
                    filemode='a')
                    #Creating an object 
logger=logging.getLogger() 
  
#Setting the threshold of logger to DEBUG 
logger.setLevel(logging.DEBUG) 
def execute(emailAddress,filenameJPG,qrcode,img,autoThrashed,fromMFP):
    subject='[New Mail Received][Code:'+qrcode+'] New Postal Mail reception notification';
    if( not autoThrashed):
        body = "Dear Sir/Madam,\n A new postal mail intended to you has been recieved and placed in the reception.\nPlease show the below QR code to reception and collect the mail.\n \nIf you want to keep the mail, then reply to this mail ID by adding [Keep] in the subject.\nIf you do not want to keep the mail, then reply to this mail ID by adding [Trash] in the subject.\n \n Note: The mail will be kept in the reception for a period of 10 days.\n \nRegards,\nAdmin"
    else:
        body = "Dear Sir/Madam,\n A new postal mail intented to you has been autoThrashed based on your preferences.\n\n Regards,\n Admin"
    sender_email = "koushik.rjn@gmail.com"
    password = "sridhargk"
    # Create a multipart message and set headers
    msgRoot = MIMEMultipart('related')
    msgRoot["From"] = sender_email
    #message["To"] = emailAddress
    msgRoot["To"] = "Koushik.Sridhar@toshiba-tsip.com"
    msgRoot["Subject"] = subject

    # Add body to email
    msgAlternative = MIMEMultipart('alternative')
    msgRoot.attach(msgAlternative)
    msgText = MIMEText(body)
    msgAlternative.attach(msgText)
    if( not fromMFP):
        filename = "uploads/"+str(filenameJPG)  # In same directory as script
    else:
        filename = "uploads/imageToSave.png"
    filename1 = "qrcode.jpg"
    # Open PDF file in binary mode
    
    
    
    msgText = MIMEText('<h1><b>Scanned Image</b></h1><br><img src="cid:image1">', 'html')
    msgAlternative.attach(msgText)
    fp = open(filename, 'rb')
    msgImage = MIMEImage(fp.read())
    fp.close()
    msgImage.add_header('Content-ID', '<image1>')
    msgRoot.attach(msgImage)
    
    
    msgText1 = MIMEText('<h1><b>Qr Code</b></h1><br><img src="cid:image2">', 'html')
    msgAlternative.attach(msgText1)
    #fp = open(filename1, 'rb')
    #msgImage1 = MIMEImage(fp.read())
    #fp.close()
    buf = BytesIO()
    img.save(buf)
    image_stream = buf.getvalue()
    msgImage1 = MIMEImage(image_stream)
    msgImage1.add_header('Content-ID', '<image2>')
    msgRoot.attach(msgImage1)
    text = msgRoot.as_string()

    # Log in to server using secure context and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, "Koushik.Sridhar@toshiba-tsip.com", text)
    os.remove(filename)