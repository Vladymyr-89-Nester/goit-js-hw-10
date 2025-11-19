import iziToast from "izitoast";
import iconMessageError from '../public/group.svg'
import iconMessage from '../public/group-1.svg'
import iconMessageCaution from '../public/group-2.svg'

const formEl = document.querySelector('.form');

const onPromise = event => {
    event.preventDefault();
    const delay = Number(formEl.elements.delay.value);
    const state = formEl.elements.state.value;

    if (isNaN(delay) || delay < 0) {
        iziToast.warning({
            message: "Please enter a non-negative delay value",
            position: "topRight",
            timeout: 7000,
            iconUrl: iconMessageCaution,
            backgroundColor: '#ffa000',
            messageColor: '#FFFFFF',
        })

        return;
    }

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay)
    })

    promise
        .then(delay => {
            iziToast.success({
                message: `Fulfilled promise in ${delay}ms`,
                position: "topRight",
                iconUrl: iconMessage,
                backgroundColor: '#59a10d',
                messageColor: '#FFFFFF',
                timeout: 7000,
            })
        })
        .catch(delay => {
            iziToast.error({
                message: `Rejected promise in ${delay}ms`,
                position: "topRight",
                iconUrl: iconMessageError,
                backgroundColor: '#ef4040',
                messageColor: '#FFFFFF',
                timeout: 7000,
            })
        })

    formEl.reset();
};

formEl.addEventListener('submit', onPromise)