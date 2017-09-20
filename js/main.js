import { attachEvents } from './components';
(function(doc) {
  const app = (function() {

    const $tabs = doc.querySelectorAll('[data-js="tab"]');
    const $content = doc.querySelectorAll('[data-js="content"]');
    
    const tabs = Array.from($tabs);
    const content = Array.from($content);

    const $divs = content.map((item) => item);
    const $links = tabs.map((item) => item);

    function showAndHideTabs() {
      if ($links[0]) {
        attachEvents($links[0], 'click', function(e) {
          $divs[0].classList.add('show');
          $divs[1].classList.add('hide');
          $divs[2].classList.add('hide');
          
          this.classList.toggle('active');
          this.nextElementSibling.classList.remove('active');
          this.nextElementSibling.nextElementSibling.classList.remove('active');
          e.preventDefault();
        });
      }

      if ($links[1]) {
        attachEvents($links[1], 'click', function(e){
        	$divs[1].classList.remove('hide');
          $divs[0].classList.add('hide');
          $divs[0].classList.remove('show');
          $divs[2].classList.add('hide');
          
          this.classList.add('active');
          this.previousElementSibling.classList.remove('active');
          this.nextElementSibling.classList.remove('active');
          e.preventDefault();
        });
      }

      if ($links[2]) {
        attachEvents($links[2], 'click', function(e){
        	$divs[2].classList.remove('hide');
          $divs[0].classList.add('hide');
          $divs[0].classList.remove('show');
          $divs[1].classList.add('hide');
          
          this.classList.add('active');
          this.previousElementSibling.classList.remove('active');
          this.previousElementSibling.previousElementSibling.classList.remove('active');
          e.preventDefault();
        });
      }
    }

    return {
      showAndHideTabs
    };

  })();
  app.showAndHideTabs();
})(document);