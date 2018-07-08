# nebulas-tutorial

1. [Nebulas 스마트 컨트랙트 개발환경 구축]()

스마트 컨트랙트 예제:

```javascript
class ExampleContract {
    constructor() {
        // `num`이라는 이름을 가진 프로퍼티를 스토리지에 정의합니다.
        LocalContractStorage.defineProperty(this, "num");
    }

    init() {
        // 컨트랙트를 배포할 때 실행되는 함수로 단 한 번만 실행됩니다.
        // 생성자에서 정의한 프로퍼티는 다음과 같이 접근할 수 있습니다. 최초의 `num` 값을 0으로 설정했습니다.
        this.num = 0;
    }

    // `num` 프로퍼티에 숫자를 저장합니다.
    save(num) {
        this.num = num;
        return `${num} is saved`;
    }

    // `num` 프로퍼티에 저장되어 있는 숫자를 읽습니다.
    read() {
        return this.num;
    }
}
module.exports = ExampleContract;
```