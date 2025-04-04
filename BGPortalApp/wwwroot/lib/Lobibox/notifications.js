function success(msg, title) {
    Lobibox.notify('success', {
        position: 'top right',
        title: title,
        size: 'mini',
        sound: false,
        delay: 10000,
        msg: msg
    });
}
function error(msg, title) {
    Lobibox.notify('error', {
        position: 'top right',
        title: title,
        size: 'mini',
        sound: false,
        delay: 20000,
        msg: msg
    });
}
function info(msg, title) {
    Lobibox.notify('info', {
        position: 'top right',
        title: title,
        size: 'mini',
        sound: false,
        delay: 20000,
        msg: msg
    });
}

function warning(msg, title) {
    Lobibox.notify('warning', {
        position: 'top right',
        title: title,
        size: 'mini',
        sound: false,
        delay: 20000,
        msg: msg
    });
}



