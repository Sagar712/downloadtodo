self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("todo-v2").then(cache => {
            return cache.addAll(["./", "./Backup.html", "./backupstyle.css", "./completedTasks.html"
            , "./other.css", "other.html", "./style.css", "./js/backup.js", "./js/completedTask.js", "./main.js"
            , "./js/other.js", "./favicon/favicon6.png"]);
        })
    );
});

self.addEventListener("fetch", e => {
    //console.log(`Intesepting fet req for: ${e.request.url}`);

    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );

});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
