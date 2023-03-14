from django.http import JsonResponse


class Process500:
    def __init__(self, get_response):
        self._get_response = get_response

    def __call__(self, request):
        return self._get_response(request)

    def process_exception(self, request, exception):
        print(f'[!] {self} | {exception}')
        return JsonResponse({
            'detail': f'{exception}'
        })