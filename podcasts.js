function Podcasts() {

    var podcasts = [
        {
            account: 'tbij',
            tag: '#the-bureau-investigates',
            client: 'fe41ef5b0a621eefbac77e2c38c50faf'
        }
    ]

    podcasts.forEach(function (podcast) {
        request('https://api.soundcloud.com/users/' + podcast.account + '/tracks?client_id=' + podcast.client, function (response) {
            var anchor = document.createElement('a')
            anchor.href = response[0].permalink_url
            document.querySelector(podcast.tag).appendChild(anchor)
            var title = document.createElement('h3')
            title.innerHTML = response[0].title
            anchor.appendChild(title)
            var description = document.createElement('p')
            description.innerHTML = response[0].description
            anchor.appendChild(description)
            var time = document.createElement('time')
            time.innerHTML = new Date(response[0].created_at).toLocaleString()
            anchor.appendChild(time)
        })
    })

    function request(uri, callback) {
        var http = new XMLHttpRequest()
        http.open('GET', uri, true)
        http.onload = function () {
            callback(JSON.parse(this.responseText))
        }
        http.send()         
    }

}

document.addEventListener('DOMContentLoaded', Podcasts)
