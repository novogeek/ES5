var $es5 = (function () {
    var mySlides = ["1.html", "2.html", "3.html", "3.1.html", "3.2.html", "4.html", "5.html",
    "6.html", "7.html", "8.html", "9.html", "10.html", "11.html"
    ];
    var container = $('#slides');
    var slideFrag = document.createDocumentFragment(), loadedSlide;

    var slideTemplate = {
        content: {
            enumerable: true,
            configurable: true,
            get: function () {
                return slideFrag;
            }
        },
        path: {
            enumerable: true,
            conigurable: true,
            set: function (url) {
                loadedSlide = $('<div class="slide" style="display:none"></div>').load('slides/' + url)[0];
                slideFrag.appendChild(loadedSlide);
            }
        }
    };

    function createSlides(url) {
        var newSlide = Object.create({}, slideTemplate);
        newSlide.path = url;
        container.append(newSlide.content);
    }

    function bindEvents() {
        container.click(function (e) {
            var target = $(e.target);
            /*Adding click event to "Run" buttons for demos.Buttons should follow this convention: 
            <input type="button" name="RunSnippetButton" value="Run" />. They should be followed by textareas having JS code snippets.*/
            if (target.attr('name') === "RunSnippetButton") {
                try {
                    (new Function(target.next('textarea').val()))();
                } catch (e) {
                    alert(e.message);
                }
            }
        });
    }

    function main() {
        mySlides.forEach(createSlides);
        container.createPPT();
        bindEvents();
    }
    return {
        init: main
    }
})();

$(document).ready(function () {
    if (!Object.defineProperties || !Object.defineProperty) {
        alert("Oops! Looks like your browser doesn't support ECMAScript 5. \n Please try this demo in modern browsers.");
        return false;
    }
    $es5.init();
    Object.freeze($es5);
});