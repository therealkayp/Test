if (!customElements.get('media-gallery')) {
  
  jQuery(".not_current_tmb").hide(); 	 
  jQuery(".current_tmb").show();  
//   jQuery(".is-active").show();
  /*var myurl = new URL(location.href);
  var params = new URLSearchParams(myurl.search);
  var show_top_flag = params.get('variant');
  if ( show_top_flag == null ) {  
  	show_top_flag = "42888989671594";
  }  
  
  chkval('Crimson','Color');*/
  
  customElements.define('media-gallery', class MediaGallery extends HTMLElement {
    constructor() {
      super();
      this.elements = {
        liveRegion: this.querySelector('[id^="GalleryStatus"]'),
        viewer: this.querySelector('[id^="GalleryViewer"]'),
        thumbnails: this.querySelector('[id^="GalleryThumbnails"]')
      }
      this.mql = window.matchMedia('(min-width: 750px)');
      if (!this.elements.thumbnails) return;

      this.elements.viewer.addEventListener('slideChanged', debounce(this.onSlideChanged.bind(this), 500));
      this.elements.thumbnails.querySelectorAll('[data-target]').forEach((mediaToSwitch) => {
        mediaToSwitch.querySelector('button').addEventListener('click', this.setActiveMedia.bind(this, mediaToSwitch.dataset.target, false));
      });
      if (this.dataset.desktopLayout !== 'stacked' && this.mql.matches) this.removeListSemantic();
    }

    onSlideChanged(event) {
      const thumbnail = this.elements.thumbnails.querySelector(`[data-target="${ event.detail.currentElement.dataset.mediaId }"]`);
      this.setActiveThumbnail(thumbnail);
    }

    setActiveMedia(mediaId, prepend) {
      const activeMedia = this.elements.viewer.querySelector(`[data-media-id="${ mediaId }"]`);
      this.elements.viewer.querySelectorAll('[data-media-id]').forEach((element) => {
      //  element.classList.remove('is-active');
      });
      activeMedia.classList.add('is-active');
//       jQuery(".thumb").hide();
//        jQuery(".is-active").show();
      jQuery(".not_current_tmb").hide(); 	 
  	  jQuery(".current_tmb").show(); 
      //alert(mediaId);  
      
      if (prepend) {
        activeMedia.parentElement.prepend(activeMedia);
        if (this.elements.thumbnails) {
          const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${ mediaId }"]`);
          activeThumbnail.parentElement.prepend(activeThumbnail);
        }
        if (this.elements.viewer.slider) this.elements.viewer.resetPages();
      }

      this.preventStickyHeader();
      window.setTimeout(() => {
        if (this.elements.thumbnails) {
          activeMedia.parentElement.scrollTo({ left: activeMedia.offsetLeft });
        }
        if (!this.elements.thumbnails || this.dataset.desktopLayout === 'stacked') {
          activeMedia.scrollIntoView({behavior: 'smooth'});
        }
      });
      this.playActiveMedia(activeMedia);

      if (!this.elements.thumbnails) return;
      const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${ mediaId }"]`);
      this.setActiveThumbnail(activeThumbnail);
      this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
    }

    setActiveThumbnail(thumbnail) {
      if (!this.elements.thumbnails || !thumbnail) return;

      this.elements.thumbnails.querySelectorAll('button').forEach((element) => element.removeAttribute('aria-current'));
      thumbnail.querySelector('button').setAttribute('aria-current', true);
      if (this.elements.thumbnails.isSlideVisible(thumbnail, 10)) return;

      this.elements.thumbnails.slider.scrollTo({ left: thumbnail.offsetLeft });
    }

    announceLiveRegion(activeItem, position) {
      const image = activeItem.querySelector('.product__modal-opener--image img');
      if (!image) return;
      image.onload = () => {
        this.elements.liveRegion.setAttribute('aria-hidden', false);
        this.elements.liveRegion.innerHTML = window.accessibilityStrings.imageAvailable.replace(
          '[index]',
          position
        );
        setTimeout(() => {
          this.elements.liveRegion.setAttribute('aria-hidden', true);
        }, 2000);
      };
      image.src = image.src;
    }

    playActiveMedia(activeItem) {
      window.pauseAllMedia();
      const deferredMedia = activeItem.querySelector('.deferred-media');
      if (deferredMedia) deferredMedia.loadContent(false);
    }

    preventStickyHeader() {
      this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
      if (!this.stickyHeader) return;
      this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
    }

    removeListSemantic() {
      if (!this.elements.viewer.slider) return;
      this.elements.viewer.slider.setAttribute('role', 'presentation');
      this.elements.viewer.sliderItems.forEach(slide => slide.setAttribute('role', 'presentation'));
    }
  });
}



//kadia --function chkval(x){ //alert(x); }

function chkval(optn,n,defaultcolor){ 
  
  //jQuery(".thumb.Turbulence").css("display","block !important");
  //jQuery(".thumb.Turbulence").css("border","1px solid red !important");
  if(n == "Color"){
    jQuery(".thumb").removeClass("is-active");
    jQuery(".thumb").removeClass("current_tmb");
    jQuery(".thumb").addClass("not_current_tmb");
    jQuery("li.thumb."+optn).removeClass("not_current_tmb");
    jQuery("li.thumb."+optn).addClass("current_tmb");
    jQuery("li.thumb."+optn).addClass("is-active");
    jQuery("li.thumb."+optn).show();
    //jQuery("li.thumb."+optn).css("display","block !important");
  //alert(1);
  }
  if(optn==defaultcolor){
//     alert(defaultcolor); 
    jQuery(".default").removeClass("not_current_tmb");
    jQuery(".default").addClass("current_tmb");
    jQuery(".default").show();
  }
}