# -*- coding: utf-8 -*-

# This will be accessible at the URL: /start/cats/<fuction>
import random
GREETINGS=['Hola','Ciao','Bounnjour','Hello']
# This will be accessible at the URL: /start/cats/onechi

def onechi():
    # return {'cat_name':chi0.jpg'}
    return dict(greeting=random.choice(GREETINGS))
