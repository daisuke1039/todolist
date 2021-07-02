(() => {

  //タブ切替
  const $menu = document.querySelector('#js_menu');
  const $menuItem = $menu.querySelectorAll('[data-menu]');
  const $content = document.querySelectorAll('[data-content]');

  const clickTabMenu = (e) => {
    e.preventDefault();

    const $this =  e.target;
    const dataTarget = $this.dataset.menu;

    $menuItem.forEach((item, index) => {
      $content[index].classList.remove('is-show');
      item.classList.remove('is-choice');
    });
  
    $content[dataTarget].classList.add('is-show');
    $this.classList.add('is-choice');
  };

  $menuItem.forEach(item => {
    item.addEventListener('click' , (e) => clickTabMenu(e));
  });

  //TODOLISTの機能
  const $addBtn = document.querySelector('.add_btn');

  $addBtn.addEventListener('click'　, () => {
    const $addInput = document.querySelector('input');
    if( $addInput.value !== "" ) {

      //要素を追加
      const $taskBody = document.createElement('li');
      const $taskText = document.createElement('p');
      const $taskCheckBtn = document.createElement('button');
      const $taskDeleteBtn = document.createElement('button');

      //追加した要素のclass名をつける
      $taskBody.className = 'task_item';
      $taskCheckBtn.className = 'check_btn';
      $taskDeleteBtn.className = 'delete_btn';

      //addInputで入力された文字をtaskTextのテキストに渡す
      $taskText.textContent = $addInput.value;
      $addInput.value = "";

      //追加した要素の位置を指定
      const $taskUl = document.querySelector('.js_task');
      $taskUl.appendChild($taskBody);
      $taskBody.appendChild($taskText);
      $taskBody.appendChild($taskCheckBtn);
      $taskBody.appendChild($taskDeleteBtn);   

      //完了アクション : 追加された要素のCHECKボタンの処理
      $taskCheckBtn.addEventListener('click', () => {
        const parentCheckItem = $taskCheckBtn.closest('.task_item');
        const $endUl = document.querySelector('.js_end');
        $taskCheckBtn.remove();
        parentCheckItem.classList.add('end_item');
        $endUl.insertBefore(parentCheckItem , $endUl.firstChild);
      });
      
      //削除アクション : 追加された要素のDELETEボタンの処理
      $taskDeleteBtn.addEventListener('click', () => {
        const parentDeleteItem = $taskDeleteBtn.closest('.task_item');
        parentDeleteItem.remove();
      });

    };
  });

  //日付の表示
  const getDate = () => {
    const nowDate =  new Date();
    const year = nowDate.getFullYear();
    const months = nowDate.getMonth() + 1;
    const date = nowDate.getDate();
    const days = nowDate.getDay();

    const month = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
    const day = ["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur"];

    const t = `${month[months]} / ${year} . ${months} . ${date} (${day[days]})`;
    return t;
  };

  const $ampm = document.querySelector('.ampm');
  const $hours = document.querySelector('.hours');
  const $minutes = document.querySelector('.minutes');
  const $seconds = document.querySelector('.seconds');

  const getTime = () => {
    const nowTime = new Date()
    const hours = String(nowTime.getHours()).padStart(2, '0');
    const minutes = String(nowTime.getMinutes()).padStart(2 , '0');
    const seconds = String(nowTime.getSeconds()).padStart(2, '0');

    const resetTime = [hours, minutes, seconds]
    return resetTime;
  };

  const repeOutputTime = () => {
    const outputGetTime = getTime();

    $hours.textContent = `${outputGetTime[0] % 12}`;
    $minutes.textContent = outputGetTime[1];
    $seconds.textContent = outputGetTime[2];

    if( outputGetTime[0] < 12 ) {
      $ampm.textContent = 'AM'
    } else {
      $ampm.textContent = 'PM'
    }
  }
  
  setInterval(repeOutputTime, 1000);
  
  const $dateText = document.querySelectorAll('.date_text');
  
  $dateText.forEach(item => {
    item.textContent = getDate();
  })

  const $closeBtn = document.querySelector('.m_close');
  const $openBtn = document.querySelector('.m_open');
  const $modal = document.querySelector('.modal');

  $closeBtn.addEventListener('click' , () => {
    $modal.classList.remove('is-open');
  });
  $openBtn.addEventListener('click' , () => {
    $modal.classList.add('is-open');
  });

})();
