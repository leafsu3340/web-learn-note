/**
 * Created by kwsy on 2018/9/14.
 * 实现一个简单的类似Emmet 功能
 */
var tag_lst=['fieldset','button','legend','input','label','form','table','span','div','ol','tr','th','td','li','p'];
var attr_set = ["#",".","[","{"];

var TagTerm = function(){
    var m_class_lst = [];     //多个class属性
    var m_attr = {};          //属性值 key = value形式
    var m_attr_lst = [];      //属性值 key 形式
    var m_tag = '';           //标签的名称
    var m_msg = '';           //文字
    var m_parent = null;      //父亲节点
    var m_child = [];         //子节点
    var m_repeat = 1;         //重复次数
    var m_level = 0;

    this.load = function(text){
        var rest = this.get_tag(text);
        this.analyse_tag(rest);
    };

    this.get_tag = function(text){
        //
        var text_len = text.length;
        var index = 0;

        for(var i =0; i<tag_lst.length; i++){
            var tag = tag_lst[i];
            if(text_len >= tag.length){
                if(tag == text.substring(0, tag.length)){
                    m_tag = tag;
                    index = tag.length;
                    break;
                }
            }
        }

        if(index==0){
            console.log("get_tag error" + text);
        }

        return text.substr(index);
    };

    this.analyse_tag = function(rest_text){
        if(rest_text == ""){
            return;
        }

        var value = "";
        var rest_text_ex = "";

        for(var i=0;i<rest_text.length;i++){
            var item = rest_text[i];
            if(i == 0){
                if(attr_set.indexOf(item) < 0){
                    console.log("analyse_tag error");
                }
            }else{
                // 解析一小段
                if(attr_set.indexOf(item) >= 0){
                    value = rest_text.substring(0, i);
                    rest_text_ex = rest_text.substring(i);
                    break;
                }
            }
        }

        if(value == ""){
            // 只有一小段需要解析
            value = rest_text;
        }

        this.analyse_tag_by_head(value);
        this.analyse_tag(rest_text_ex);
    };

    this.analyse_tag_by_head = function(text){
        if(text[0] == "#"){
            m_attr['id'] = text.substring(1);
        }else if(text[0] == "."){
            m_class_lst.push(text.substring(1));
        }else if(text[0] == "["){
            this.analyse_brackets(text);
        }else if(text[0] == '{'){
            this.analyse_barce(text);
        }
    };

    this.analyse_brackets = function(text){
        var tag_text = text.substring(1, text.length-1);
        var split_arr = tag_text.split(" ");
        for(var i =0;i<split_arr.length;i++){
            var item = split_arr[i];
            var arr = item.split("=");
            if(arr.length==2){
                m_attr[arr[0]] = arr[1];
            }else{
                m_attr_lst.push(arr[0]);
            }
        }
    };

    this.analyse_barce = function(text){
        m_msg = text.substring(1, text.length-1);
    };

    this.toHtml = function(level){
        m_level = level;
        var head = this.build_head();
        var tail = this.build_tail();
        var content = this.build_content();
        var html = head + content + tail;
        var out_put = "";
        for(var i = 0; i< m_repeat;i++){
            out_put += html;
        }
        return out_put;
    };

    this.get_blank = function(level){
        var blank = "";
        for(var i =0;i<level;i++){
            blank += "  ";
        }
        return blank;
    }
    this.build_content = function(){
        var content = m_msg;
        var children = this.build_children();
        if(content.length > 0){
            children = children.trim();
        }
        return content + children;
    };

    this.build_children = function(){
        var child_html = "";
        for(var i =0 ;i<m_child.length;i++){
            child_html +=  m_child[i].toHtml(m_level+1);
        }
        return child_html;
    };
    this.build_tail = function(){
        if(m_child.length>0){
            return this.get_blank(m_level) + "</" + m_tag + ">\n";
        }
        return "</" + m_tag + ">\n";
    };
    this.build_head = function(){
        var attributes = this.build_attr();
        var class_attr = this.build_class();
        var html = "<" + m_tag + class_attr + attributes + ">";

        if(m_child.length > 0){
            html += "\n";
        }
        return this.get_blank(m_level) + html;
    };

    this.build_attr = function(){
        var attributes = "";
        for(var key in m_attr){
            var attritem = key + "=\"" + m_attr[key] + "\"";
            attributes += " " + attritem;
        }

        for(var i =0;i<m_attr_lst.length;i++){
            attributes += " " + m_attr_lst[i];
        }

        return attributes;
    };

    this.build_class = function(){
        if(m_class_lst.length==0){
            return "";
        }
        var class_attr = "";
        for(var i = 0;i<m_class_lst.length; i++){
            class_attr += m_class_lst[i] + " ";
        }

        class_attr = class_attr.substring(0, class_attr.length-1);
        return " class=\"" + class_attr + "\"";
    };

    this.add_child = function(item){
        m_child.push(item);
    };

    this.get_children = function(){
        return m_child;
    };

    this.set_parent = function(item){
        m_parent = item;
    };

    this.get_parent = function(){
        return m_parent;
    };

    this.show_tag = function(){
        return m_tag;
    };

    this.set_repeat = function(count){
        m_repeat = count;
    }
};

function test(){
    var tt = new TagTerm();
    tt.load('div');
    console.log(tt.toHtml());

    var tt = new TagTerm();
    tt.load('div#haha');
    console.log(tt.toHtml() == '<div id="haha"></div>');

    var tt = new TagTerm();
    tt.load('div#haha.class1.class2');
    console.log(tt.toHtml()=='<div class="class1 class2" id="haha"></div>');

    var tt = new TagTerm();
    tt.load('div#haha.class1.class2[name=dd type=text]');
    console.log(tt.toHtml()=='<div class="class1 class2" id="haha" name="dd" type="text"></div>');

    var tt = new TagTerm();
    tt.load('div#haha.class1.class2[name=dd type=text]{hhh}');
    console.log(tt.toHtml()=='<div class="class1 class2" id="haha" name="dd" type="text">hhh</div>');
}


//test();
exports.TagTerm = TagTerm;