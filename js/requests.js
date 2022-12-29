import { store } from "./store.js"

// JSON Request 양식 만들기
export function createRequest(type, data) {
  const res = {
    method: type,
    headers: { ...store.headers }
  }
  if (data) {
    res.body = JSON.stringify(data)
  }
  return res
}

export async function signUp(email, password, id, profile = null) {
  try {
    const res = await fetch(
      store.url + '/auth/signup',
      createRequest('POST', { email, password, id, profile })
    )
    const json = await res.json()
    return json
  } catch (error) {
    alert(error)
  }
}

// 회원가입 데이터
// export async function signUp(email, password, id, profile = null) {
//   const res = await fetch(store.url + '/auth/signup', {
//     method: 'POST',
//     headers: {
//       ...store.headers
//     },
//     body: JSON.stringify({
//       "email": email,
//       "password": password,
//       "displayName": id,
//       "profileImgBase64": profile
//     })
//   })
//   const json = await res.json()
//   if (res.ok) {
//     return json
//   } else {
//     alert(json)
//   }
// }

// 로그인 데이터
export async function login(email, password) {
  const res = await fetch(store.url + '/auth/login', {
    method: 'POST',
    headers: {
      ...store.headers,
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    alert(json)
  }
}

// 로그아웃 데이터
export async function logout(accessToken) {
  const res = await fetch(store.url + '/auth/logout', {
    method: 'POST',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 로그인 유지 데이터
export async function keepLogin(accessToken) {
  const res = await fetch(store.url + '/auth/me', {
    method: 'POST',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 사용자 정보 수정 데이터
export async function editUser(accessToken, displayName, oldPassword, newPassword) {
  const res = await fetch(store.url + '/auth/user', {
    method: 'PUT',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "displayName": displayName,
      "oldPassword": oldPassword,
      "newPassword": newPassword
    })
  })
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    alert(json)
  }
}

// 선택 가능한 은행 목록 조회 데이터
export async function accountLookUp(accessToken) {
  const res = await fetch(store.url + '/account/banks', {
    method: 'GET',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 계좌 목록 및 잔액 조회 데이터
export async function accountCharge(accessToken) {
  const res = await fetch(store.url + '/account', {
    method: 'GET',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 계좌 연결 데이터
export async function addAccount(accessToken, bankCode, accountNumber, phoneNumber) {
  const res = await fetch(store.url + '/account', {
    method: 'POST',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "bankCode": bankCode,
      "accountNumber": accountNumber,
      "phoneNumber": phoneNumber,
      "signature": true
    })
  })
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    alert(json)
  }
}

// 계좌 해지 데이터
export async function cancelAccount(accessToken, accountId) {
  const res = await fetch(store.url + '/account', {
    method: 'DELETE',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "accountId": accountId,
      "signature": true
    }),
  })
  const json = await res.json()
  return json
}

// 단일 제품 상세 조회 데이터
export async function getProductDetail(productId) {
  const res = await fetch(store.url + '/products' + `/${productId}`, {
    method: 'GET',
    headers: {
      ...store.headers,
    }
  })
  const json = await res.json()
  return json
}

// 결제 데이터
export async function getBuy(accessToken, productId, accountId) {
  const res = await fetch(store.url + '/products/buy', {
    method: 'POST',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "productId": productId,
      "accountId": accountId
    })
  })
  const json = await res.json()
  if (res.ok) {
    return json
  } else {
    alert(json)
  }
}

// 사용자 거래 내역 데이터
export async function getTransactions(accessToken) {
  const res = await fetch(store.url + '/products/transactions/details', {
    method: 'GET',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  const json = await res.json()
  return json
}

// 사용자 거래 취소 데이터
export async function cancelTransactions(accessToken, productId) {
  const res = await fetch(store.url + '/products/cancel', {
    method: 'POST',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "detailId": productId
    })
  })
  const json = await res.json()
  return json
}

// 사용자 거래 확정 데이터
export async function confirmation(accessToken, productId) {
  const res = await fetch(store.url + '/products/ok', {
    method: 'POST',
    headers: {
      ...store.headers,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "detailId": productId
    })
  })
  const json = await res.json()
  return json
}

// 제품 검색 데이터
export async function postSearch(searchText, searchTags,) {
  const res = await fetch(store.url + '/products/search', {
    method: 'POST',
    headers: {
      ...store.headers,
    },
    body: JSON.stringify({
      searchText,
      searchTags,
    })
  })
  const json = await res.json()
  return json
}