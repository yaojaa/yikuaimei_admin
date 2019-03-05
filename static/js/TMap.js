export function TMap() {
    return new Promise(function(resolve, reject) {
      window.init = function() {
        resolve(qq)
      }
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key=SYABZ-FPFRG-JC4QQ-IURT5-FOQHH-3HFCI&libraries=place'
      script.onerror = reject
      document.head.appendChild(script)
    })
  }
  