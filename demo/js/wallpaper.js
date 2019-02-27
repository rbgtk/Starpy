const Wallpaper = (function (countClosest = 5) {
    let stars  = [];
    let width  = window.innerWidth;
    let height = window.innerHeight;
    let target = { x: width / 2, y: height / 2 };

    let canvas  = document.getElementById('wallpaper');
    let context = canvas.getContext('2d');

    function init(image) {
        canvas.width  = width;
        canvas.height = height;

        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return AJAX.get("/assets/json/" + image + ".json")
            .then(scalePoints)
            .then(connectPoints)
            .then(setStars)
            .catch(console.error);
    }

    function handleMouseMove(e) {
        let x = 0, y = 0;

        if (e.pageX || e.pageY) {
            x = e.pageX - document.documentElement.scrollLeft;
            y = e.pageY - document.documentElement.scrollTop;
        } else if (e.clientX || e.clientY) {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        target.x = x;
        target.y = y;
    }

    function getDistance(p, q) {
        return Math.pow(q.x - p.x, 2) + Math.pow(q.y - p.y, 2);
    }

    function animate() {
        context.clearRect(0, 0, width, height);

        for (let s in stars) {

            let p = stars[s];
            let d = getDistance(target, p);

            if (d < 4000) {
                p.active = 0.3;
            } else if (d < 20000) {
                p.active = 0.1;
            } else if (d < 40000) {
                p.active = 0.02;
            } else {
                p.active = 0;
            }

            drawLines(p);
            drawCircle(p);
        }

        requestAnimationFrame(animate);
    }

    function drawLines(point) {
        if (!point.active) return;

        context.beginPath();

        for (let d = 0; d < countClosest; d++) {
            if (!point.connections.hasOwnProperty(d))
                break;

            let closest = point.connections[d];

            context.moveTo(point.x, point.y);
            context.lineTo(closest.x, closest.y);

            context.strokeStyle = "rgba(156, 217, 249, " + point.active + ")";

            context.stroke();
        }
    }

    function drawCircle(point) {
        if (!point.active) return;

        context.beginPath();
        context.arc(point.x, point.y, 3, 0, 2 * Math.PI, false);

        context.fillStyle = "rgba(156, 217, 249, " + point.active * 2 + ")";

        context.fill();
    }

    function scalePoints(points) {
        for (let i in points) {
            if (!points.hasOwnProperty(i))
                continue;

            let p = points[i];

            p.x = p.x - 0.5 * (1920 - width);
            p.y = p.y - 0.5 * (1200 - height);
        }

        return points;
    }

    function connectPoints(points) {
        for (let s1 in points) {
            if (!points.hasOwnProperty(s1))
                continue;

            let p = points[s1];

            p.connections = [];

            for (let s2 in points) {
                if (!points.hasOwnProperty(s2))
                    continue;

                let q = points[s2];

                if (p !== q) {
                    let distance = getDistance(p, q);

                    for (let i = 0; i < countClosest; i++) {
                        if (p.connections[i] === undefined) {
                            p.connections[i] = {
                                x: q.x,
                                y: q.y,
                                d: distance
                            };

                            break;
                        } else if(distance <= p.connections[i].d) {
                            p.connections.splice(i, 0, {
                                x: q.x,
                                y: q.y,
                                d: distance
                            });

                            break;
                        }
                    }
                }
            }
        }

        return points;
    }

    function setStars(points) {
        stars = points;
    }

    return {
        init:  init,
        start: animate
    }
})();
