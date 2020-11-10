import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function onOpenModal(event) {

    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const instance = basicLightbox.create(`<img src="${event.target.dataset.src}" alt="" />`);
    instance.show();
}