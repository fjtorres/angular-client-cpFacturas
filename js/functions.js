function expandTable (buttonId, tabledId) {
    $(buttonId).click(function(e){
        e.preventDefault();

        var $icon = $(this).find('i');
        var $table = $(tabledId);

        if ($table.hasClass('table-condensed')) {
            $table.removeClass('table-condensed');
            $table.addClass('table-big');
            $icon.removeClass('glyphicon-th-large');
            $icon.addClass('glyphicon-th-list');
        } else {
            $table.addClass('table-condensed');
            $table.removeClass('table-big');
            $icon.removeClass('glyphicon-th-list');
            $icon.addClass('glyphicon-th-large');
        }
        
    });
}