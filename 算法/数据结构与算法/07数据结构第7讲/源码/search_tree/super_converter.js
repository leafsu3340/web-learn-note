/**
 * Created by kwsy on 2018/9/14.
 */

const TagTerm = require('./tag_term');

function SuperConverter(){
    var tag_set = ['>','+','^'];
    var m_tagNode = null;

    this.init = function(){
        // 每次转换前清空之前的节点
        m_tagNode = new TagTerm.TagTerm();
    };

    // 进行转换
    this.convert = function(text){
        this.init();
        this.convert_ex(m_tagNode,text);
        return this.toHtml();
    };

    this.convert_ex = function(tag_node, text){
        // tag_node 是当前要分析的一个节点对象
        if(text == ""){
            return;
        }
        if(text.length==1){
            this.convert_ex_normal(tag_node, text);
        }
        else if(text[1] == "(" || text[0] == "("){
            var res = this.find_tag_group(text);
            var tag_group = res[0];
            var rest_text = res[1];
            this.convert_ex_normal(tag_node, tag_group);
            this.convert_ex(tag_node, rest_text);
        }else{
            this.convert_ex_normal(tag_node, text);
        }

    };

    this.find_tag_group = function(text){
        var start = 0;
        if(text[1] == "("){
            start = 1;
        }
        var count = 0;
        for(var i = start; i<text.length;i++){
            var item = text[i];
            if(item == "("){
                count++;
            }
            if(item == ")"){
                count--;
            }
            if(count == 0){
                if(i+1 < text.length && text[i+1]=="*"){
                    for(var index = i+2; index<text.length;index++){
                        if("0123456789".indexOf(text[index]) < 0){
                            break;
                        }
                    }
                    return [text.substring(0, index+1), text.substring(index+1)];
                }else{
                    return [text.substring(0, i+1), text.substring(i+1)];
                }
            }
        }
    };

    this.analyse_tag = function(tag){
        var tt = new TagTerm.TagTerm();
        tt.load(tag)
        return tt;
    };
    this.find_tag_index = function(text){
        var tag_index = 0;
        var bracket = false;
        while(tag_index < text.length){
            if(text[tag_index] == "{"){
                bracket = true;
            }
            if(tag_set.indexOf(text[tag_index]) >=0){
                if(bracket){
                    if(text[tag_index-1]=="}"){
                        break;
                    }
                }else{
                    break;
                }
            }
            tag_index ++;
        }
        if(tag_index == text.length){
            return [text, ""];
        }
        return [text.substring(0, tag_index), text.substring(tag_index)];
    }
    this.convert_ex_normal = function(tag_node, text){
        var res = this.find_tag(text);
        var tagTerm = res[0];
        var rest_text = res[1];

        var tag_1 = tag_node.show_tag();
        var tag_2 = tagTerm.show_tag();
        if(tag_set.indexOf(text[0]) < 0){
            tag_node.add_child(tagTerm);
            tagTerm.set_parent(tag_node);
        }else{
            if(text[0] == '>'){
                tag_node.add_child(tagTerm);
                tagTerm.set_parent(tag_node);
            }else if(text[0] == '+'){
                tag_node.get_parent().add_child(tagTerm);
                tagTerm.set_parent(tag_node.get_parent());
            }else{
                var t = tag_node.get_parent().show_tag();
                tag_node.get_parent().get_parent().add_child(tagTerm);
                tagTerm.set_parent(tag_node.get_parent().get_parent());
            }
        }

        if(rest_text==""){
            return ;
        }

        this.convert_ex(tagTerm,rest_text);
    };

    this.find_tag = function(text){
        var tag_text = text;
        if(tag_set.indexOf(text[0]) >= 0){
            // 不要前面的层次关系
            tag_text = text.substring(1);
        }

        var tag = "";
        var rest_text = null;
        var res = [];
        var repeat = 1;
        if(tag_text[0]=="("){
            var repeat_info = this.get_repeat(tag_text);
            tag_text = repeat_info[0];
            repeat = repeat_info[1];
            res = this.find_tag_index(tag_text.substring(1, tag_text.length-1));
            tag = res[0];
            rest_text = res[1];
        }else{
            res = this.find_tag_index(tag_text);
            tag = res[0];
            rest_text = res[1];
            var repeat_info = this.get_repeat(tag);
            tag = repeat_info[0];
            repeat = repeat_info[1];
        }

        var tagTerm = this.analyse_tag(tag);
        tagTerm.set_repeat(repeat);
        return [tagTerm, rest_text];
    };

    this.get_repeat = function(text){
        var index = text.length -1;
        var b_repeat = false;
        while(index >= 0){
            if("0123456789".indexOf(text[index]) < 0){
                if(text[index] == "*"){
                    b_repeat = true;
                }
                break;
            }
            index--;
        }
        if(b_repeat==false){
            return [text, 1];
        }
        var repeat = parseInt(text.substring(index+1));
        return [text.substring(0, index), repeat];
    };

    this.toHtml = function(){
        var html = "";
        var child_list = m_tagNode.get_children();
        for(var i=0;i< child_list.length;i++){
            var tag_text = child_list[i].toHtml(0);
            html += tag_text;
        }
        return html;
    };
};


function test(){
    var sc = new SuperConverter();
    var html = sc.convert('div>p>span');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div{aas}');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div{aas}>p');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div{aa>s}>p');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div{aa>s}>p{哈哈}');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div#haha.class1.class2[name=dd type=text]{hhh}');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div>p{div的下级}+span{p的平级}^div{从下级中出来了}');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div{这是一段话}+div{这是另一段}>p{另一段的子级内容}');
    console.log(html);


    var sc = new SuperConverter();
    var html = sc.convert('div.class1#id1>p.class2#id2{加油}');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div.class1.class2.class3{继续努力}');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div.class1[align=center style=display:none autofocus]{别忘了要}+p{和其他功能}>span{兼容哦}');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('div.class1[align=center style=display:none autofocus]{别忘了要}+p{和其他功能}>span{兼容哦}');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('form#payment>(fieldset>legend+ol>li>label[for=name]{演示表单：}+input[id=name name=marketing_id type=text placeholder=请输测试信息])+fieldset>button[type=submit]{提交}');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('table>tr>td{高难度}*3');
    console.log(html);

    var sc = new SuperConverter();
    var html = sc.convert('table>(tr>td{高难度}*3)*4');
    console.log(html);
};

test();