from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    params={'name':'om','place':'Mars'}
    return render(request,"index.html",params)


def removepunc(request):
    print(request.GET.get('text','default'))
    text=request.GET.get('text','default')
    return HttpResponse("remove")

def capitallize(request):
    return HttpResponse("capitallize")

def about(request):
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Famous Quotes with Links</title>
    </head>
    <body>
        <h1>Famous Quotes</h1>

        <p>
            <a href="https://www.goodreads.com/quotes/9353-the-only-limit-to-our-realization-of-tomorrow-is-our" target="_blank">
                "The only limit to our realization of tomorrow is our doubts of today." – Franklin D. Roosevelt
            </a>
        </p>

        <p>
            <a href="https://www.goodreads.com/quotes/13052-in-the-middle-of-every-difficulty-lies-opportunity" target="_blank">
                "In the middle of every difficulty lies opportunity." – Albert Einstein
            </a>
        </p>
        <p>
            <a href="http://127.0.0.1:8000/remove/" target="_blank">
                BACK TO REMOVE
            </a>
        </p>

        <p>
            <a href="https://www.goodreads.com/quotes/14064-success-is-not-final-failure-is-not-fatal-it" target="_blank">
                "Success is not final, failure is not fatal: It is the courage to continue that counts." – Winston Churchill
            </a>
        </p>

        <p>
            <a href="https://www.goodreads.com/quotes/589430-happiness-is-not-something-ready-made-it-comes-from-your" target="_blank">
                "Happiness is not something ready made. It comes from your own actions." – Dalai Lama
            </a>
        </p>

        <p>
            <a href="https://www.goodreads.com/quotes/24499-be-the-change-that-you-wish-to-see-in-the" target="_blank">
                "Be the change that you wish to see in the world." – Mahatma Gandhi
            </a>
        </p>
    </body>
    </html>
    """
    return HttpResponse(html_content)
