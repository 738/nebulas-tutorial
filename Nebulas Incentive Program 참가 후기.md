# Nebulas Incentive Program 참가 후기

## 서문

[네뷸러스(Nebulas)](https://nebulas.io/kr)는 2018년 1분기에 메인넷 Eagle Nebula 1.0을 출시했습니다. 네뷸러스는 블록체인 개발자들이 메인넷 위에서 보다 뛰어난 DApp의 개발을 장려하고 더불어서 네뷸러스 개발 친화적 블록체인 생태계를 구축하기 위해 [Nebulas Incentive Incentive Program 시즌 1](https://nebulas.io/incentive.html)을 2018년 5월 7일부터 7월 2일까지 개최했습니다. (8주간 개최되며 1주 단위로 시상합니다.)

총 상금은 460,000 NAS(2018년 5월 14일 NAS 가격기준, 약 41억4000만원)로 개발자의 눈길을 끌만큼 상금은 매우 컸습니다. 게다가 등수 안에 들지 않고 DApp을 만들기만 해도 100NAS를 New DApp Prize로 지급한다고 해서 프로그램은 꼭 참여해야겠다고 생각했습니다. 그래서 저는 네뷸러스 튜토리얼과 위키를 보면서 DApp 개발을 위한 공부를 시작했습니다. 결과적으로 3개의 DApp을 완성했고, 2개의 DApp이 승인되어 220NAS를 New DApp Prize로 지급받았습니다. 또한, 기회가 주어져 네뷸러스 한국 대사로써 네뷸러스 생태계에 기여하고 있습니다.

네뷸러스의 간단한 튜토리얼은 [이전 글 네뷸러스 DApp 개발 튜토리얼]()을 참고하세요.

**편리한 언어 접근성**

네뷸러스의 스마트 컨트랙트 언어는 이더리움의 [Solidity](http://solidity.readthedocs.io/en/v0.4.24/), Viper와는 다르게 기존의 개발자에게 친숙한 Javascript와 Typescript를 지원해서 접근하기가 용이했습니다. 네뷸러스가 제공하는 튜토리얼을 보고 바로 스마트 컨트랙트를 개발할 수 있을 정도로 *Learning Curve*가 짧았습니다. 물론 Solidity만큼의 보안 수준은 기대할 수 없겠습니다.

**아직 많이 부족한 생태계**

네뷸러스 블록체인의 인지도가 많이 없어서 네뷸러스 커뮤니티에 국내 개발자는 거의 찾아볼 수 없었습니다. 아무래도 중국에서 만든 블록체인이라 중국인들의 비중이 압도적이었습니다. 네뷸러스가 여러 바운티 프로그램을 열어서 많은 개발자들이 네뷸러스 DApp 가이드를 작성하고 디버깅 툴을 개발하는 등 많은 참여가 이루어지고 있긴 하지만 확실히 이더리움만큼의 생태계를 구축하기까지는 오랜 시간이 필요할 것으로 보입니다.

## 첫 번째 DApp: Votestagram

제일 처음으로 생각나는 DApp 기획은 투표 어플리케이션이었습니다. 투표야말로 탈중앙화 어플리케이션에 가장 어울리는 것으로 생각했기 때문입니다. 그리고 처음으로 만들기에 간단할 것이라고 생각했습니다. 소스코드는 [여기](https://github.com/JonJee/nebulas-voting)에서 볼 수 있습니다.

### 개발 프로세스

1. [`go-nebulas`](https://github.com/nebulasio/go-nebulas) 설치하여 네뷸러스 로컬 노드 실행 ([이전 글 네뷸러스 DApp 개발 튜토리얼]() 참조)
2. 스마트 컨트랙트 개발
    * while bug:
    1. 로컬 노드에 배포
    2. 테스트
    3. 디버깅
3. 웹 프론트엔드 개발(neb.js, nebPay.js 사용)

### 스마트 컨트랙트 개발

자바스크립트와 타입스크립트로 모두 스마트 컨트랙트를 개발할 수 있지만 아직 타입스크립트에 대한 문서는 많이 공개되어 있는 상태가 아니여서 저는 자바스크립트로 스마트 컨트랙트 개발을 진행하였습니다. 이더리움의 [Truffle](https://truffleframework.com/)과 같이 편리한 스마트 컨트랙트 개발환경이 있으면 좋겠지만 아직 부재한 것 같습니다.

각각의 투표에 대한 정보를 가지고 있는 `VotingItem` 객체를 생성하고 각각의 투표 아이템들을 관리하는 메인 클래스인 `VotingManager` 객체를 생성했습니다. `VotingManager`는 `LocalContractStorage`에 투표 아이템들을 저장하고, 조회하고, 지우는 등의 역할을 이행합니다.

`VotingManager` 안에 구현해놓은 함수입니다.

```js
// 투표 아이템을 등록
enroll(votingItem) {
    // ...
}

// `id`에 해당하는 투표 아이템을 조회
get(id) {
    // ...
}

// 모든 투표 아이템을 조회
getVotingList() {
    // ...
}

// `id`에 해당하는 투표 아이템의 `index`에 투표
vote(id, index) {
    // ...
}

// 투표 아이템을 등록한 유저가 투표 아이템을 제거
delete(id) {
    // ...
}
```

### [`neb.js`](https://github.com/nebulasio/neb.js), [`nebPay.js`](https://github.com/nebulasio/nebPay) 사용하여 웹 클라이언트에서 스마트 컨트랙트와 상호작용하기

네뷸러스의 `neb.js`, `nebPay.js`는 이더리움의 [`web3.js`](https://web3js.readthedocs.io/en/1.0/)와 같이 프론트엔드에서 네뷸러스 노드와 상호작용할 수 있도록 만들어놓은 라이브러리입니다. 주로 위에서 개발한 스마트 컨트랙트의 함수를 호출해서 투표 아이템을 등록하고 조회하는 등의 기능에 사용할 것입니다.

알아둬야할 것은 `enroll`, `vote`, `delete`와 같이 데이터에 변화를 주는 함수들은 트랜잭션을 전송해야하기 때문에 트랜잭션 수수료를 지불하여 트랜잭션을 전송해야 합니다. 또한, `get`, `getVotingList`와 같이 데이터를 조회하는 함수들은 단지 호출만 하면 되므로 트랜잭션을 보낼 필요가 없습니다.

완성된 DApp의 링크입니다: [Votestagram](https://vote.nasd.app/)

> 웹 프론트엔드는 React.js, material-ui를 사용하여 개발하였습니다.

![votestagram](https://github.com/JonJee/nebulas-voting/blob/master/docs/img/capture_votinglistview.png?raw=true)
![votestagram2](https://github.com/JonJee/nebulas-voting/raw/master/docs/img/capture_voteview.png?raw=true)
![votestagram3](https://github.com/JonJee/nebulas-voting/raw/master/docs/img/capture_votingresult.png?raw=true)

## 두 번째 DApp: Fortune Cookie

첫 번째 DApp인 [Votestgram](https://vote.nasd.app)이 New Dapp Prize를 받고 난 후 정말 간단하게 만들어도 참가상 보상을 지급받을 수 있을지 궁금해서 최대한 간단하고 빠르게 만들기로 했습니다. 고민고민하다가 두 번째 DApp으로는 중국인들이 좋아하는 포츈쿠키를 기획했습니다. 제목그대로 포츈쿠키의 운세를 보여주는 기능을 가진 DApp이었습니다. 그것만 있으면 너무 단순해서 자신의 마지막 포츈쿠키 운세 조회 기능과 트위터 공유 기능을 넣었습니다. 소스코드는 [여기](https://github.com/JonJee/FortuneCookie)에서 볼 수 있습니다.

### 스마트 컨트랙트 개발

```js
// CookieManager 클래스 안의 함수입니다.

// 운세들을 저장합니다. 스마트 컨트랙트를 배포한 주소가 아니면 운세들을 저장할 수 없습니다.
save(fortunes) {
    // ...
}

// 운세를 뽑아 유저의 히스토리에 저장합니다.
crackCookie() {
    // ...
}

// 유저의 히스토리를 반환합니다.
getHistory(address) {
    // ...
}

// address와 block의 height에 따라서 어떤 운세를 보여줄지 결정합니다.
_hash(address) {
    // ...
}
```

> 기능이 단순해서 첫 번째 DApp을 만들 때에 비해서 시간은 월등히 짧게 소요되었습니다. 웹 프론트엔드는 라이브러리 없이 HTML/CSS/JS/jquery를 사용하였습니다.

완성된 DApp의 링크입니다: [Fortune Cookie](https://cookie.nasd.app/)

![fortunecookie](https://github.com/JonJee/nebulas-tutorial/blob/master/img/nip/fortunecookie.png?raw=true)

## 세 번째 DApp: Nebulas Address Book

이 DApp은 송금을 편하게 하기 위해 개발한 DApp입니다. 자신이 자주 보내는 주소를 이름과 함께 등록하여 쉽게 송금할 수 있습니다. 소스코드는 [여기](https://github.com/JonJee/nas-addressbook)에서 볼 수 있습니다.

### 스마트 컨트랙트 개발

```js
// 밑의 4개 함수는 CRUD 관련 함수입니다.
save(address, name) {
    // ...
}

get() {
    // ...
}

edit(address, newName) {
    // ...
}

delete(address) {
    // ...
}

// 즐겨찾기 설정하면 클라이언트에서 제일 위에 노출됩니다.
addOrRemoveFavorite(address) {
    // ...
}
```

완성된 DApp의 링크입니다: [Nebulas Address Book](https://nasd.app/)

![nas-addressbook](https://github.com/JonJee/nebulas-tutorial/blob/master/img/nip/nas-addressbook.png?raw=true)

## 마치며

네뷸러스 블록체인과 스마트 컨트랙트를 공부하면서 탈중앙화된 어플리케이션이 어떤 의미를 가지는지 그리고 왜 탈중앙화가 되어야하는지 고민해볼 수 있었습니다. 네뷸러스 인센티브 프로그램이 7월 2일에 성공적으로 마쳤고, 이더리움 DApp의 두 배 정도에 해당하는 총 6800여개의 DApp의 제출되었다고 합니다. 기존의 프로그래밍 언어인 자바스크립트를 이용한만큼 친숙하다는 장점이 있지만 이더리움의 솔리디티만큼 블록체인에 특화되어있지 않아서 완성도가 떨어진다는 느낌을 받았습니다. 또한, 이더리움의 [Truffle](https://truffleframework.com/), [Ganache](https://truffleframework.com/ganache)와 같은 개발을 편리하게 해주는 툴도 아직 많이 부족하여 개발 생태계가 더욱 커질 때까지는 시간이 걸리겠다고 생각했습니다. 하지만 네뷸러스 블록체인은 아직 초기 단계이고 많은 프로그램을 기획하고 진행하는 것으로 보아 머지않은 시간 내에 이더리움만큼이나 생태계가 커질 것으로 생각합니다.
