
require('materialize-css/dist/js/materialize.min')

const ImagesLoaded  = require('imagesloaded'),
      jQueryBridget = require('jquery-bridget'),
      Masonry       = require('masonry-layout')

jQueryBridget( 'masonry', Masonry, $ )
jQueryBridget( 'imagesLoaded', ImagesLoaded, $ )

$(function() {

    let $containerBlog = $("#item-posts")
    $containerBlog.imagesLoaded(function() {
        $containerBlog.masonry({
            itemSelector: ".item",
            columnWidth: ".item-sizer",
        });
    });

    /*
    * Sweet Alerts - For Articles
    */
    // Delete
    $('.btn-delete-article').click(deleteArticle)

    function deleteArticle(e) {
        e.preventDefault()
        let elem        = e.currentTarget,
            href        = elem.parentElement.getAttribute('action')
            id          = elem.getAttribute('form').replace('delete-',''),
            $parentElem = $("#"+id)


        swal({
            title: "Etes vous sûr?",
            text: "Vous ne pourrez pas revenir en arrière!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, supprime!",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },() => {
            // Call to AJAX
            $.post(href,{ _method: 'DELETE' })
             .done( data => {
                $containerBlog.masonry('remove', $parentElem).masonry('layout');
                swal({
                    title: "Supprimé!",
                    text: "L'article à bien été supprimé.",
                    type: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
             });
        });
    }

    /*
    * Sweet Alerts - For Categories
    */
    // Create
    $('.btn-add').click(addCat)
    // Update
    $('.btn-update').click(updateCat)
    // Delete
    $('.btn-delete').click(deleteCat)

    function addCat(e) {
        e.preventDefault()
        let elem = e.currentTarget,
            href = elem.parentElement.getAttribute('action')

        swal({
            title: "Gestion des Catégories!",
            text: 'Ajouter une catégorie:',
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: 'nouvelle catégorie',
            showLoaderOnConfirm: true,
        }, newData => {
            if (newData === false) return false;
            if (newData === "") {
                swal.showInputError("Vous devez entrer un prénom et un nom!");
                return false;
            }
            // Call to AJAX
            $.post(href,{ _method: 'POST', name: newData})
            .done( datas => {
                // Injects the data into the template and adds it to the page
                var template = $('script[data-template="tableCatTpl"]').html()
                $('tbody').prepend(render(template, datas))
                $('.btn-update').click(updateCat);
                $('.btn-delete').click(deleteCat);

                swal({
                    title: "Bravo!",
                    text: 'La catégorie ' + newData + ' à bien été ajoutée.',
                    type: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            });
        });
    }

    function updateCat(e) {
        e.preventDefault()
        let elem = e.currentTarget,
            data = elem.dataset.name,
            href = elem.dataset.href,
            id   = elem.dataset.id

        swal({
                title: "Gestion des Catégories!",
                text: 'Modifier le nom de la catégorie:',
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputValue: data,
                showLoaderOnConfirm: true,
            }, newData => {
                if (newData === false) return false;
                if (newData === "") {
                    swal.showInputError("Vous devez entrer un catégorie!");
                    return false;
                }
                // Call to AJAX
                $.post(href,{ _method: 'PUT', name: newData})
                 .done( data => {

                    let catElem = $('#' + id),
                        actionElem = catElem.next().find('a')

                    catElem.attr('id',data.id)
                    catElem.html(data.name)
                    actionElem.attr('data-slug', data.slug)
                    actionElem.attr('data-name', data.name)

                    swal({
                        title: "Bravo!",
                        text: "La catégorie à bien été modifié pour " + newData + ".",
                        type: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                 });
            });

    }

    function deleteCat(e) {
        e.preventDefault()
        let elem        = e.currentTarget,
            href        = elem.parentElement.getAttribute('action')
            id          = elem.getAttribute('form').replace('delete-',''),
            $parentElem = $("#"+id).parent()

        swal({
            title: "Etes vous sûr?",
            text: "Vous ne pourrez pas revenir en arrière!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, supprime!",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },() => {
            // Call to AJAX
            $.post(href,{ _method: 'DELETE' })
             .done( data => {
                $parentElem.remove()
                swal({
                    title: "Supprimé!",
                    text: "La catégorie à bien été supprimé.",
                    type: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
             });
        });
    }

    /*
    * Sweet Alerts - For Users
    */
    // Create
    $('.btn-add-user').click(addUser)
    // Delete
    $('.btn-delete-user').click(deleteUser)

    function addUser(e) {
        e.preventDefault()
        let elem = e.currentTarget,
            href = elem.parentElement.getAttribute('action')

        swal({
            title: "Gestion des Membres!",
            text: 'Ajouter un nouvel adhérent - étape 1',
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: 'Prénom Nom'
        }, fullname => {
            if (fullname === false) return false;
            if (fullname === "") {
                swal.showInputError("Vous devez entrer un prénom et un nom!");
                return false;
            }
            // let fullname = fullname
            swal({
                title: "Gestion des Membres!",
                text: 'Ajouter un nouvel adhérent - étape 2',
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: 'Email',
                showLoaderOnConfirm: true
            }, email => {
                if (email === false) return false;
                if (email === "") {
                    swal.showInputError("Vous devez entrer un email!");
                    return false;
                }
                // Call to AJAX
                $.post(href,{ _method: 'POST', fullname:fullname, email:email })
                .done( datas => {
                    // Injects the data into the template and adds it to the page
                    let template = $('script[data-template="cardUserTpl"]').html()
                    let item = $(render(template, datas))
                    $containerBlog.prepend(item).masonry('prepended', item)

                    swal({
                        title: "Bravo!",
                        text: 'L\'utilisateur ' + fullname + ' à bien été ajoutée.',
                        type: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                });
            })
        });
    }
    function deleteUser(e) {
        e.preventDefault()
        let elem        = e.currentTarget,
            href        = elem.parentElement.getAttribute('action')
            id          = elem.getAttribute('form').replace('delete-',''),
            $parentElem = $("#"+id)

            console.log($parentElem)

        swal({
            title: "Etes vous sûr?",
            text: "Vous ne pourrez pas revenir en arrière!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, supprime!",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },() => {
            // Call to AJAX
            $.post(href,{ _method: 'DELETE' })
             .done( data => {
                $containerBlog.masonry('remove', $parentElem).masonry('layout');
                swal({
                    title: "Supprimé!",
                    text: "L'utilisateur à bien été supprimé.",
                    type: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
             });
        });
    }

    // Very basic templating
    function render(template, datas) {
        var patt = /\$\{([^}]+)\}/g; // matches ${key}
        return template.replace(patt, (_, key) => {
            return datas[key];
        });
    }


});
