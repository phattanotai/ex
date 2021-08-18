import Swal from 'sweetalert2';
import Vue from 'vue';
import toastr from "toastr";

var timer = 5000;

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

export default {

    error(message) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: false,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
        Toast.fire({
            icon: 'error',
            title: message
        });
    },
    Error(message) {
        Vue.$toast.open({
            message: message,
            position: 'bottom-right',
            duration: timer,
            type: 'error',
            dismissible: true,
            queue: false
        });
    },
    ERROR(message) {
        toastr.error(message);
    },
    success(message) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: false,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
        Toast.fire({
            icon: 'success',
            title: message
        });
    },
    Success(message) {
        Vue.$toast.open({
            message: message,
            position: 'bottom-right',
            duration: timer,
            type: 'success',
            dismissible: true,
            queue: false
        });
    },
    SUCCESS(message) {
        toastr.success(message);
    },
    warning(message) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: false,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
        Toast.fire({
            icon: 'warning',
            title: message
        });
    },
    Warning(message) {
        Vue.$toast.open({
            message: message,
            position: 'bottom-right',
            duration: timer,
            type: 'warning',
            dismissible: true,
            queue: false
        });
    },
    WARNING(message) {
        toastr.warning(message);
    },
    info(message) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: false,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
        Toast.fire({
            icon: 'info',
            title: message
        });
    },
    Info(message) {
        Vue.$toast.open({
            message: message,
            position: 'bottom-right',
            duration: timer,
            type: 'info',
            dismissible: true,
            queue: false
        });
    },
    INFO(message) {
        toastr.info(message);
    },
}