(() => {

  // //タブ切替
  const $tab = document.querySelector('#js_tab');
  const $tabItem = $tab.querySelectorAll('.tab_value');
  const $content = document.querySelectorAll('[data-content]');
  
  function clickTab(e) {
    const _that = e.target;
    const tabValue = _that.value;
    $content.forEach( element => element.classList.remove('isShow') );
    const targetContent = document.querySelector(`[data-content="${tabValue}"]`)
    targetContent.classList.add('isShow');
  }

  $tabItem.forEach( item => item.addEventListener('change', clickTab))

  //TODOLISTの機能
  const $addBtn = document.querySelector('.add_btn');

  $addBtn.addEventListener('click'　, () => {
    const $addInput = document.querySelector('.add_list');
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
      $taskCheckBtn.addEventListener('click', clickTaskCheck);
      
      //削除アクション : 追加された要素のDELETEボタンの処理
      $taskDeleteBtn.addEventListener('click', clickTaskDelete);

    };
  });

  function clickTaskCheck(e) {
    const _that = e.target;
    const parentCheckItem = _that.closest('.task_item');
    const $endUl = document.querySelector('.js_end');
    _that.remove();
    parentCheckItem.classList.add('end_item');
    $endUl.insertBefore(parentCheckItem , $endUl.firstChild);
  }

  function clickTaskDelete(e) {
    const _that = e.target;
    const parentDeleteItem = _that.closest('.task_item');
    if (window.confirm('削除しますか')) {
      parentDeleteItem.remove();
    } 
  }

  //日付の表示
  function getDate() {
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

  function getTime() {
    const nowTime = new Date();
    const hours = String(nowTime.getHours()).padStart(2, '0');
    const minutes = String(nowTime.getMinutes()).padStart(2 , '0');
    const seconds = String(nowTime.getSeconds()).padStart(2, '0');

    const resetTime = [hours, minutes, seconds]
    return resetTime;
  };

  function repeOutputTime() {
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

  $dateText.forEach( item => item.textContent = getDate() );

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
