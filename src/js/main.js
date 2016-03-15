// (function () {
    // Adding original images
    var image1 = new Backbone.Model({ url: 'src/img/img1.jpg', likes: 0 });
    var image2 = new Backbone.Model({ url: 'src/img/img2.jpg', likes: 0 });
    var images = new Backbone.Collection([image1, image2]);

    // Creating html input box and button, appending to body
    var input = $('<input>');
    var addButton = $('<button>').text('Add');
    $(document.body).append(input);
    $(document.body).append(addButton);

    // Creating new img tag for photos
    function createImagesView (collection) {
        var el = $('<div>', {
            class: 'images'
        });

        function render () {
            el.empty();
            collection.forEach(function (model) {
                var childView = createImageView(model);
                el.append(childView);
            });
        }

        collection.on('add', render);
        collection.on('remove', render);
     
        render();

        return el;
    }

    function createImageView (model) {
        var el = $('<div>');

        function renderView () {
            el.empty();
            var img = $('<img>');
            var likes = $('<button>');
            var remove = $('<button>');
            remove.text('Delete');

            el.append(img, likes, remove);
            
            img.attr('src', model.get('url'));
            
            likes.text(model.get('likes'));

            likes.on('click', function () {
                model.set('likes', model.get('likes') + 1);
            });

            remove.on('click', function () {
                model.destroy();
            });
        }

        model.on('change', renderView);

        renderView();

        return el;
    }

    $(document.body).append(createImagesView(images));

    function addImage () {
        var newImg = { url: $('input').val(), likes: 0 };
        images.add(newImg);
    }

    addButton.on('click', addImage);