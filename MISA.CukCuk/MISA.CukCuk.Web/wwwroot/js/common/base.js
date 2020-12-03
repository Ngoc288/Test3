//import { values } from "../../css/fontawesome-free-5.15.1-web/js/v4-shims";



/**
 * Class quản lý sự kiện, function
 * created by ngochtb(13/11/2020)*/
class BaseJS {
    constructor() {
        this.host = "http://localhost:51014";
        this.apiRouter = null;
        this.setApiRouter();
        this.initEvent();
        this.loadData();

    }

    setApiRouter() {

    }


    initEvent() {
        var me = this;
        //Sự kiện click khi nhấn vào thêm mới
        $('#btnAdd').click(me.btnAddOnClick.bind(me));

        //Load lại dữ liệu khi nhấn button nạp:
        $('#btnRef').click(function () {
            me.loadData();
        })

        //Ẩn form chi tiết khi nhấn huỷ
        $('#btnCancel').click(function () {
            dialogDetail.dialog('close');
        })

        //Thực hiện lưu dữ liệu khi nhấn button lưu trên form chi tiết
        $('#btnSave').click(me.btnSaveOnClick.bind(me));

        //Sửa thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi
        $('table tbody').on('dblclick', 'tr', function (e) {
            me.editData(e);
        })

        //Chọn 1 bản ghi để thực hiện thao tác xóa
        $('table tbody').on('click', 'tr', function () {
            $('tbody').children().removeClass('choosetr');
            $(this).addClass('choosetr');
        })

        
        $('#btnDel').click(function () {
            dialogConfirm.dialog('open');
        })

        //Ẩn form confirm
        $('#btnCFCancel').click(function () {
            dialogConfirm.dialog('close');
        })

        //Thực hiện xoá bản ghi
        $('#btnConfirm').click(function (e) {
            me.deleteData(e);
        })

        //Kiểm tra trường để trống
        $('.input-required').blur(validateEmpty);

        //Kiểm tra định dạng email
        $('#txtEmail').blur(validateEmail);
    }
    /**
     * Load dữ liệu
     * createdby ngochtb(13/11/2020)
     * */
    loadData() {

        try {
            var me = this;
            $('table tbody').empty();
            //Lấy thông tin cột dữ liệu
            var columns = $('table thead tr th');
            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
                async: true,
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $(tr).data('recordId', obj.EmployeeId);
                    //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
                    $.each(columns, function (index, th) {
                
                        var td = $(`<td></td>`);
                        var fieldName = $(th).attr('fieldName');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "Money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            default:
                                break;
                        }
                        /*if (fieldName == 'Gender') {
                            if (value == 1) value = 'Nam';
                            else if (value == 0) value = 'Nữ';
                            else value = 'Khác';
                        }*/
                        td.append(value);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })
            }).fail(function (res) {
            })
        } catch (e) {
            console.log(e);
        }
    }
    /**
    * Hàm xử lý khi nhấn button thêm mới
    * createdby ngochtb(20/11/2020)
    * */
    btnAddOnClick() {
        try {
            var me = this;
            me.FormMode = 'Add';
            //Hiển thị dialog thông tin chi tiết
            dialogDetail.dialog('open');
            $('input').val(null);

            //Lấy dữ liệu cho các cbbox
            //var select = $('select #cbxDepartment');
            
            var selects = $('.build-select');
            selects.empty();
            $.each(selects, function (index, select) {
                var _url = $(select).attr("api");
                var fieldValue = $(select).attr("fieldValue");
                var fieldName = $(select).attr("fieldName")
                $.ajax({
                    url: me.host + _url,
                    method: "GET",

                }).done(function (res) {
                    if (res) {
                        $.each(res, function (index, obj) {

                            var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                            $(select).append(option);

                        })
                    }
                    $('.loading').hide();
                }).fail(function (res) {
                    debugger;
                    $('.loading').hide();
                })
            })
            
            //Lấy dữ liệu trong nhóm phòng ban
            $('.loading').show();
            
        } catch (e) {
            console.log(e);
        }

    }

    /**
     * Hàm xử lý khi nhấn button lưu
     * createdby ngochtb(20/11/2020)
     * */

    btnSaveOnClick() {
        try {
            var me = this;
            //validate dữ liệu
            var inputValidates = $('.input-required');
            $.each(inputValidates, function (index, input) {
                $(input).trigger(`blur`);
            })
            var notInput = $('input[validate=false]');
            if (notInput && notInput.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại!");
                notInput[0].focus();
                return;
            }

            //thu thập thông tin dữ liệu được nhập

            //Lấy tất cả các control nhập liệu

            var inputs = $('.infor input, select');
            var entity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(input).attr('fieldName');
                var propertySelect = $(input).attr('fieldValue');
                var value = $(input).val();
                if (propertyName == 'Salary') {
                    var result = '';
                    value.replace(/\d+/gm, function (number) {                        
                        result = result + number;                                               
                    });
                    entity[propertyName] = result;
                }
                else if (propertySelect) {
                    entity[propertySelect] = value;
                } else {
                    entity[propertyName] = value;
                }
            })

            var method = "POST";
            var apiRouter = me.apiRouter;
            if (me.FormMode == 'Edit') {
                method = "PUT";
                entity.EmployeeId = me.recordId;
                apiRouter = apiRouter + `/${me.recordId}`;
            }
            console.log(entity);

            //gọi service tương ứng thực hiện lưu trữ dữ liệu
            $.ajax({
                url: me.host + apiRouter,
                method: method,
                data: JSON.stringify(entity),
                contentType: 'application/json'
            }).done(function (res) {
 
                //sau khi lưu thành công:
                //+đưa ra thông báo, 
                if (method == "POST")
                    alert("làm thông báo đi nhá em");
                else
                    alert('Sua thanh cong');
                //+ẩn form chi tiết,
                console.log(res);
                dialogDetail.dialog('close');
                //+load lại dữ liệu
                me.loadData();

            }).fail(function (res) {
                if (method == "POST")
                    alert(res.responseJSON.Messenger);
                else
                    alert('Sua that bai');
                console.log(res);
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm chỉnh sử dữ liệu khi nháy đúp chuột vào td
     * createdby ngochtb(20/11/2020)
     * */
    editData(item) {
        try {
            //load form
            dialogDetail.dialog('open');
            //load dữ liệu cho các combobox:
            var me = this;
            var selects = $('select[fieldName]');
        
             $.each(selects, function (index, select) {
                 //Lấy dữ liệu nhóm khách hàng
                 var api = $(select).attr('api');
                 var fieldName = $(select).attr('fieldName');
                 var fieldValue = $(select).attr('fieldValue');
                 $('loading').show();
                 $.ajax({
                     url: me.host + api,
                     method: "GET",
                     async: false
                 }).done(function (res) {
                     if (res) {
                         $.each(res, function (index, obj) {
                             var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                             $(select).append(option);
                         })
                     }
                     $('.loading').hide();
                 }).fail(function (res) {
                     $('.loading').hide();
                 })
             })

            //Lấy khoá chính của bản ghi
            me.FormMode = 'Edit';
          
            var recordId = $(item.currentTarget).data('recordId');
            me.recordId = recordId;
            //Gọi service lấy thông tin chi tiết qua Id
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET",
            }).done(function (res) {
                //Binding dữ liệu lên form chi tiết
                var inputs = $('.infor input, select[fieldName]');
                var entity = {};
                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldName');
                    var propertyType = $(this).attr('type');
                    var value = res[propertyName];

                    //Load dữ liệu combobox
                    if (this.tagName == "SELECT") {
                        var propValueName = $(this).attr('fieldValue');
                        value = res[propValueName];

                    }
                    ///Load lương cơ bản
                    if (propertyName == 'Salary') {
                        value = formatMoney(value) + " VNĐ";
                    }
                    //Load dữ liệu ngày
                    if (propertyType == 'date') {
                        value = formatDatePicker(value);
                    }
                    $(this).val(value);

                })
            }).fail(function (res) {
                console.log(res);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /*
     * Hàm xoá dữ liệu khi chọn bản ghi rồi click button xóa
     * createdby ngochtb(21/11/2020)
     * */

    deleteData(item) {
        try {
            var me = this;
            me.FormMode = 'Delete';
            var id = $('.choosetr').data('recordId');
            console.log(id);
             $.ajax({
                url: me.host + me.apiRouter + `/${id}`,
                method: 'DELETE',
             }).done(function (res) {
                 me.loadData();
            }).fail(function (res) {
             
            })
             
        } catch (e) {
            console.log(e);
        }
        dialogConfirm.dialog('close');
    }

}