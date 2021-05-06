(() => {

  //タブ切替
  const $menu = document.querySelector('#js_menu');
  const $menuItem = $menu.querySelectorAll('[data-menu]');
  const $content = document.querySelectorAll('[data-content]');

  const menuClick = (e) => {
    e.preventDefault();

    const $this =  e.target;
    const dataTarget = $this.dataset.menu;

    let index = 0;
    while( index < $menuItem.length ) {
    $content[index].classList.remove('is-show');
    $menuItem[index].classList.remove('is-choice');
    index++;
    };
  
    $content[dataTarget].classList.add('is-show');
    $this.classList.add('is-choice');

  };

  let index = 0;
  while( index < $menuItem.length ) {
    $menuItem[index].addEventListener('click' , (e) => menuClick(e));
    index++;
  };

  //TODOLISTの機能
  const $addBtn = document.querySelector('.add_btn');

  $addBtn.addEventListener('click'　, () => {

    const $addInput = document.querySelector('input');

    if( $addInput.value !== "" ) {

      //要素を追加
      const $taskBody = document.createElement('li');
      const $taskText = document.createElement('p');
      const $taskCheck = document.createElement('button');
      const $taskDelete = document.createElement('button');

      //追加した要素のclass名をつける
      $taskBody.className = 'task_item';
      $taskCheck.className = 'check_btn';
      $taskDelete.className = 'delete_btn';

      //addInputで入力された文字をtaskTextのテキストに渡す
      $taskText.textContent = $addInput.value;
      $addInput.value = "";

      const $taskUl = document.querySelector('.js_task');

      //追加した要素の位置を指定
      $taskUl.appendChild($taskBody);
      $taskBody.appendChild($taskText);
      $taskBody.appendChild($taskCheck);
      $taskBody.appendChild($taskDelete);   

      //完了アクション
      //追加された要素のCHECKボタンの処理
      $taskCheck.addEventListener('click', () => {
        const cItem = $taskCheck.closest('.task_item');
        const $endUl = document.querySelector('.js_end');
        $taskCheck.remove();
        cItem.classList.add('end_item');
        $endUl.insertBefore(cItem , $endUl.firstChild);
      });
      
      //削除アクション
      //追加された要素のDELETEボタンの処理
      $taskDelete.addEventListener('click', () => {
        const dItem = $taskDelete.closest('.task_item');
        dItem.remove();
      });

    };

  });

  //日付の表示
  const now =  new Date();
  const year = now.getFullYear();
  const months = now.getMonth() + 1;
  const date = now.getDate();
  const days = now.getDay();

  const getDate = () => {

   const month = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
   const day = ["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur"];

   const t = `${month[months]} / ${year}.${months}.${date} (${day[days]})`;
   return t;

  };

  const $messageText = document.querySelector('.message');
  if( date <= 10 ) {
    $messageText.textContent = 'お疲れさまです';
  } else if (date > 10 && data <=20 ) {
    $messageText.textContent = '今月も折り返し。お疲れさまです';
  } else if (date > 20 && data <=31 ) {
    $messageText.textContent = '今月も残り少し。';
  } 
  
  const $dateText = document.querySelectorAll('.date_text');
  let dateNum = 0;
  while( dateNum < $dateText.length ) { 
    $dateText[dateNum].textContent = getDate();
    dateNum++;
  };

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
