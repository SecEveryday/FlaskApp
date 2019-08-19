from io import BytesIO
import email, smtplib, ssl
import os
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import logging 
#Create and configure logger 
logging.basicConfig(filename="server.log", 
                    format='%(asctime)s %(message)s', 
                    filemode='a')
                    #Creating an object 
logger=logging.getLogger() 
  
#Setting the threshold of logger to DEBUG 
logger.setLevel(logging.DEBUG) 
def execute(emailAddress,filenameJPG,qrcode,img,autoThrashed):
    subject='[New Mail Received][Code:'+qrcode+'] New Postal Mail reception notification';
    if( not autoThrashed):
        body = "Dear Sir/Madam,\n A new postal mail intended to you has been recieved and placed in the reception.\nPlease show the below QR code to reception and collect the mail.\n \nIf you want to keep the mail, then reply to this mail ID by adding [Keep] in the subject.\nIf you do not want to keep the mail, then reply to this mail ID by adding [Trash] in the subject.\n \n Note: The mail will be kept in the reception for a period of 10 days.\n \nRegards,\nAdmin"
    else:
        body = "Dear Sir/Madam,\n A new postal mail intented to you has been autoThrashed based on your preferences.\n\n Regards,\n Admin"
    sender_email = "koushik.rjn@gmail.com"
    password = "sridhargk"
    # Create a multipart message and set headers
    message = MIMEMultipart()
    message["From"] = sender_email
    #message["To"] = emailAddress
    message["To"] = "Koushik.Sridhar@toshiba-tsip.com"
    message["Subject"] = subject

    # Add body to email
    message.attach(MIMEText(body, "plain"))

    filename = "uploads/"+str(filenameJPG)  # In same directory as script
    filename1 = "qrcode.jpg"
    # Open PDF file in binary mode
    with open(filename, "rb") as attachment:
        # Add file as application/octet-stream
        # Email client can usually download this automatically as attachment
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())

    # Encode file in ASCII characters to send by email    
    encoders.encode_base64(part)

    # Add header as key/value pair to attachment part
    part.add_header(
        "Content-Disposition",
        f"attachment; filename= {filename}",
        
    )
    part2 = MIMEBase("application", "octet-stream")
    logger.debug(type(img))
    buf = BytesIO()
    img.save(buf)
    image_stream = buf.getvalue()
    part2.set_payload(image_stream)
    encoders.encode_base64(part2)

    # Add header as key/value pair to attachment part
    part2.add_header(
        "Content-Disposition",
        f"attachment; filename= {filename1}",
        
    )
    # Add attachment to message and convert message to string
    message.attach(part)
    message.attach(part2)
    text = message.as_string()

    # Log in to server using secure context and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, "Koushik.Sridhar@toshiba-tsip.com", text)
    os.remove(filename)