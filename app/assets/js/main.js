$(function () {

    $('.input-block').click(function (e) {
        let input = $(this).find('.input-block__input');
        let plug = $(this).find('.input-block__plug');

        input.css('display', 'block');

        if ($(this).hasClass('input-block--phone')) {
            $(this).find('input').mask("+7 (999) 999-99-99", { placeholder: "+7 (___) ___ - __ - __" });
        }

        input.focus();

        plug.css('display', 'none');
    });

    $('.input-block').find('.input-block__input').on( "focusout", function(e) {
        let parent = $(this).parents('.input-block');

        if (!$(this).val()) {
            $(this).css('display', 'none');
            $(this).siblings('.input-block__plug').removeAttr('style');
        }
        
        if (parent.hasClass('input-block--phone')) {
            $(this).val('');
            $(this).unmask();
            $(this).siblings('.input-block__plug').removeAttr('style');
        }
    });


    $('.modal__close').click(function (e) {
        $(this).parents('.modal').removeClass('open');
    });



    $('.select-block').each(function (e) {

        function Select (block) {
            let list = block.find('.select-block__list');

            if (block.hasClass('open')) {
                list.fadeOut(300, function (e) {
                    block.removeClass('open');
                });
            } else {
                list.fadeIn(200, function (e) {
                    block.addClass('open');
                });
            }
        }

        $(this).find('.select-block__now').click(function (e) {

            let block = $(this).parents('.select-block');
            
            Select(block);
        });

        $(this).find('.select-block__list span').click(function (e) {
            let parent = $(this).parents('.select-block');
            let input = parent.find('input');
            let now = parent.find('.select-block__now span');

            input.val($(this).data('val'));
            now.text($(this).text())


            Select($(this).parents('.select-block'));
        });


        $('.btn-send-block__btn').click((e) => {
            e.preventDefault();
            alert('Сообщение не отправлено. Это просто верстка)')
        });

        $('.main .btn').click((e) => {
            $('.modal').addClass('open');
        });


    });


    


});