from django.core.mail import send_mail

class Util:

    @staticmethod
    def send_email(subject,body,from_email,to_emails):        
        send_mail(
            subject,
            body,
            from_email,
            to_emails,
            fail_silently=False,
        )