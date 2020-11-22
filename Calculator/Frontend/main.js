const app = Vue.createApp({
    data() {
        return {
            backendServer: 'localhost',
            backendPort: '8080',
            result: '0',
            op: '',
            a: ''
        }
    },
    methods:{
        clear(){
            this.result = '0';
            this.a = '';
            this.op = '';
        },
        handleError(){
            this.a = '';
            this.op = '';
        },
        append(number){
            if(this.result === '0' || this.result === 'E'){
                this.result = number.toString();
            }else{
                this.result += number;
            }
        },
        switchSigns(){
            if( this.result !== '0' && this.result !== 'E' ){
                if(this.result.charAt(0) === '-')
                    this.result = this.result.substring(1);
                else
                    this.result = '-' + this.result;
            }
        },
        addDot(){
            if( this.result !== 'E' ){
                if( ! this.result.includes('.')){
                    this.result += '.';
                }
            }
        },
        removeLastAdded(){
            this.result = this.result.substring(0, this.result.length - 1);
            if(this.result.length == 0)
                this.result = '0';
        },
        equal(){
            if( this.result !== 'E' ){
                if( (this.result === '0' && (this.op === '%' || this.op === '÷'))
                || (this.op === '%' && this.result.includes('.'))){
                    this.result = 'E';
                    this.handleError();
                }else{
                    var operation = "";
                    switch(this.op){
                        case '+':
                            operation = "add";
                            break;
                        case '-':
                            operation = "subtract";
                            break;
                        case 'x':
                            operation = "multiply";
                            break;
                        case '÷':
                            operation = "divide";
                            break;
                        case '%':
                            operation = "mod";
                            break;
                        default:
                            return;
                    }
                    axios.get(`http://${this.backendServer}:${this.backendPort}/${operation}?a=${this.a}&b=${this.result}`).then(
                        response => {
                            this.result = response.data.toString()
                        }
                    )
                    this.a = '';
                    this.op = '';
                }
            }
        },
        inversing(){
            if( this.result !== 'E' ){
                if(this.result === '0'){
                    this.result = 'E';
                    this.handleError();
                }else{
                    axios.get(`http://${this.backendServer}:${this.backendPort}/divide?a=1&b=${this.result}`).then(
                        response => {
                            this.result = response.data.toString()
                        }
                    )
                }
            }
        },
        squaring(){
            if( this.result !== 'E' ){
                axios.get(`http://${this.backendServer}:${this.backendPort}/multiply?a=${this.result}&b=${this.result}`).then(
                    response => {
                        this.result = response.data.toString()
                    }
                )
            }
        },
        squarrooting(){
            if( this.result !== 'E' ){
                axios.get(`http://${this.backendServer}:${this.backendPort}/sqrt?a=${this.result}`).then(
                    response => {
                        this.result = response.data.toString()
                    }
                )
            }
        },
        setOperation(oper){
            if( this.result !== 'E' ){
                if (oper==='%' && this.result.includes('.')){
                    this.result = 'E';
                    this.handleError();
                }
                else if(this.a.length==0){
                    this.a = this.result;
                    this.op = oper;
                    this.result = '';
                }else if (this.result.length == 0){
                    this.op = oper;
                }else{
                    if( this.result !== 'E' ){
                        if( (this.result === '0' && (this.op === '%' || this.op === '÷'))
                        || (this.op === '%' && this.result.includes('.'))){
                            this.result = 'E';
                            this.handleError();
                        }else{
                            var operation = "";
                            switch(this.op){
                                case '+':
                                    operation = "add";
                                    break;
                                case '-':
                                    operation = "subtract";
                                    break;
                                case 'x':
                                    operation = "multiply";
                                    break;
                                case '÷':
                                    operation = "divide";
                                    break;
                                case '%':
                                    operation = "mod";
                                    break;
                                default:
                                    return;
                            }
                            axios.get(`http://${this.backendServer}:${this.backendPort}/${operation}?a=${this.a}&b=${this.result}`).then(
                                response => {
                                    this.a = response.data.toString()
                                }
                            )
                            this.result = '';
                            this.op = oper;
                        }
                    }
                }
            }
        }
    }
})
