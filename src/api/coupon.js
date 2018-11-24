import fetch from '@/utils/fetch';
export let add = function (res) {
  let this_ = this;
  return fetch(res).then(data => {
    if (data.data.code === 0) {
      this_.$store.dispatch('USER_SIGNIN', { sid: data.headers.sid })
      this_.$router.push('/')
    } else {
      this_.$message.error(data.data.msg)
    }
  })
};
