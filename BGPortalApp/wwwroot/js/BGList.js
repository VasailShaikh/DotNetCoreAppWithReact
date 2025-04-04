const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
$(document).ready(function () {
    $("#nav-search-input").val(params.filter);
   // $("#chkMyPending").prop("checked", true);
    GetBGList(1);  
});

function handleSearchKeyPress(event) {

    if (event.key === 'Enter') {
        event.preventDefault();
        GetBGList(1);
    }
}
function GetAllBGList() {
    $('#nav-search-input').val('');
    $('#ddlStatusType').val('-1');
    $("#chkMyPending").prop("checked", false);
    $("#CBKUnderQuery").prop("checked", false);
    GetBGList(1);
}

function GetBGList(_pageindex)
{   
  
    var token = $('input[name="__RequestVerificationToken"]').val();
    var PageIndex = parseInt(_pageindex);
    var PageSize = parseInt($('#ddlPageSize').val());
    var FilterText = $('#nav-search-input').val();
    var StatusID = $('#ddlStatusType').val() > 0 ? $('#ddlStatusType').val():null;
    var UnderQuery = false;
    var SortBy = $('#hdnSortBy').val();
    var MyPending = false;

    $.ajax({
        type: "POST",
        url: "/Home/BGList",
        data: { PageIndex: PageIndex, PageSize: PageSize, FilterText: FilterText.trim(), StatusID: StatusID, MyPending: MyPending, SortBy: SortBy, Underquery: UnderQuery },      
        success: function (result)
        {
            console.log(result);
            $('#userDatatable2').html("");
            $('#footerPaging').html("");
            $('#footerDisplayingItems').html("");
            if (result.totalrow > 0)
            {
                debugger;
                getBGprocessorDashboard(result, PageSize, PageIndex);
            }            
        }
    });
}


function GetPaging(_total, _pagesize, _pageindex) {
    var _html = "";
    var total = parseInt(_total);
    var noofrecords = parseInt(_pagesize);
    var pageindex = parseInt(_pageindex);

    var pagecount = parseInt(Math.ceil(parseInt(total) / parseFloat(_pagesize)));
    if (noofrecords < total) {
        //First <<
        if (pageindex > 1) {
            _html += '<li class=""><a data-page="1" onclick="GetBGList(1)"><i class="ace-icon fa fa-angle-double-left"></i></a></li>';
            _html += '<li class=""><a data-page="' + (pageindex + 1) + '" onclick="GetBGList(' + (pageindex - 1) + ')"><i class="ace-icon fa fa-angle-left"></i></a></li>';
        }
        else {
            _html += '<li class="disabled"><a data-page="1" ><<</a></li>';
            _html += '<li class="disabled"><a data-page="1" ><</a></li>';
        }
        if (pageindex > 3) {
            _html += ' <li class=""><a data-page="' + (pageindex - 3) + '" href="#">..</a></li>';
        }
        for (i = pageindex - 3; i < pageindex; i++) {
            if (i > -1 && i < pagecount) {
                if (pageindex == (i + 1)) {
                    _html += ' <li class="active"><a data-page="' + (i + 1) + '" onclick="GetBGList(' + (i + 1) + ')">' + (i + 1) + '</a></li>';
                } else {
                    _html += ' <li class=""><a data-page="' + (i + 1) + '" onclick="GetBGList(' + (i + 1) + ')">' + (i + 1) + '</a></li>';
                }
            }
        }
        if (pagecount - pageindex > 2) {
            _html += ' <li class=""><a data-page="' + (pageindex + 3) + '" href="#">..</a></li>';
        }
        //Last <<
        if (pagecount > pageindex) {
            _html += '<li class=""><a data-page="' + (pageindex + 1) + '" onclick="GetBGList(' + (pageindex + 1) + ')">></a></li>';
            _html += '<li class=""><a data-page="' + pagecount + '" onclick="GetBGList(' + pagecount + ')">>></a></li>';
        }
        else if (pagecount = pageindex) {
            _html += '<li class="disabled"><a data-page="' + (pageindex + 1) + '" >></i></a></li>';
            _html += '<li class="disabled"><a data-page="' + (pageindex + 1) + '" >>></i></a></li>';
        }
    }
    $('#footerPaging').html(_html);
}

function ShortBy(type, lbl) {
    $('#hdnSortBy').val(type);
    $('#btnSortBy').html(lbl + '<span class="fa fa-caret-down"></span>');
    $('#dropdownShortMenu').removeClass('open');
    GetBGList(1);
}

function toggle() {
    if ($('#styleSelector').hasClass('open')) {
        $('#styleSelector').removeClass('open');
    } else {
        $('#styleSelector').addClass('open');
    }
}




function getBGprocessorDashboard(result, PageSize, PageIndex) {
    var _html = "";
    var start = ((PageSize * (PageIndex - 1)) + 1);
    var end = start + PageSize - 1;

    var srno = start;
    for (i = 0; i < result.bGList.length; i++) {
        var row = result.bGList[i];
        //var Vendor = row.VendorCode.split("-");
        var PendingWithMe = row.PendingWithMe == true ? "actionPendingWith" : "";
        var daysdiff = DaysDifference(new Date().toJSON().slice(0, 10), ConvertDateMMddyyyy(row.BGExpiry));
        var rowHighlight = daysdiff < 3 ? "Row_HighLight" : "";
        if (i % 2 === 0) { _html += '<tr class="' + rowHighlight + '">'; }
        else {
            _html += '<tr class="' + rowHighlight + '">';// class="odd">';
        }

        var status = row.Stage;
        
        var detail = 'BuyerPSNo : ' + row.BuyerPSNo + '<br>';
        totalCountRow = result.totalrow;
      
        _html += '<td class="center">' + (srno++) + '</td>';
        var lblststus = '';
        if (IsExpired(row.BGExpiryDisplay))
        {
             lblststus = '<label class="lblexpire center text-danger form-control">Expired</label>';            
        }
               
        _html += '<td><a href="/BGList/ViewRequest/?id=' + row.enc_id_rbg + '">' + row.BGName + '</a>' + lblststus+'</td>';
        
        _html += '<td id="tdVendocode_' + row.Id_RequestBG + '"  class="center">' + row.VendorCode + '</td>';
        _html += '<td class="center" id="' + row.Id_RequestBG + '">' + row.VendorCode + '</td>';
        _html += '<td class="CellWithComment center">' + row.PONO + '';
        _html += '<span class="CellComment center">' + detail + '</span></td>';
        _html += '<td class="center">' + row.BGType + '</td>';
        _html += '<td class="center">' + row.BGExpiryDisplay + '</td>';
        _html += '<td class="center">' + row.BGAmount + '</td>';
        _html += '<td class="center">' + row.BGProcessorPSNo + '</td>';
        _html += '<td class="center" id="tdStatus_' + i + '" style="width:180px;">' + status + row.HardCopyStatus+ '</td>';                  
        _html += '<td class="center">' + ConvertDateddmmmyyyy(row.DateAdded) + '<br><span class="badge badge-info" data-toggle="tooltip" title="LastActionOn">' + ConvertDateddmmmyyyy(row.LastActionOn) + '</span></td>';
        _html += '<td class="center" id="tdAction_' + i + PendingWithMe + '">'+ row.ActionButtonHTML+'</td>';
        _html += '</tr>';
    }
    
    $('#userDatatable2').html(_html);

    if ((totalCountRow - start + 1) < PageSize)
    {
        end = totalCountRow;
    }
    $('#footerDisplayingItems').html("Displaying " + start + " to " + end + " of " + totalCountRow + " items")
    GetPaging(totalCountRow, PageSize, PageIndex);
}


var fileRoot = $("#hdnFileRootURL").val();
$(document).ready(function () {
    $(".date").datepicker({ autoclose: true });
    var bgreqIdVal = getUrlParameter('bgreqid');
    if (bgreqIdVal != null && bgreqIdVal != "")
    {
        $("#hdnBgReqId").val(bgreqIdVal);
        GetBgRequestByReqId(bgreqIdVal);
    }
});

$(".ToolTipTitle").each(function () {
    $(this).attr("title", $(this).attr("couriertitle").replace(/\movetonextline/g, '\n'));
});
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
function GetHardCopy(srno) {
    if (confirm("Are you sure you want to receive hardcopy ?") == true) {
        $.ajax({
            type: "GET",
            url: '/BGList/ReqHardCopy?Id_RequestBG=' + srno,
            dataType: "json",
            success: function (result) {
                if (result.requested) {
                    alert("Hard Copy request submitted");
                }
                else {
                    alert("Hard Copy request not submitted");
                }
            }
        });
    }
};

function GetBgRequestByReqId(bgReqId) {
    var id_stageVal = 0;
    $.ajax({
        type: "GET",
        asyn: false,
        url: '/BGList/GetBgRequestByReqId?Id_RequestBG=' + bgReqId,
        dataType: "json",
        success: function (result) {

            $.each(result, function (idx, elem) {
                id_stageVal = elem.Id_Stage;
            });

        }, error: function (xhr, status, error) {
            console.log("Error session: " + error + ", status: " + xhr.error);
        }
    });
    return id_stageVal;
}


function ConvertDate(date) {
    if (date == null)
        return "";

    //console.log(date);
    // console.log(date.substr(6));
    var newdate = new Date(parseInt(date.substr(6))).toLocaleDateString();
    // console.log(newdate);
    var datearray = newdate.split("/");
    return datearray[1] + '/' + datearray[0] + '/' + datearray[2];
}
function ConvertDateMMddyyyy(date)
{
    debugger;
    return new Date(parseInt(date.substr(6))).toLocaleDateString();
}

function ConvertDateddmmmyyyy(date) {
    if (date == null)
        return "";
    // console.log(date.substr(6));
    var newdate = new Date(parseInt(date.substr(6))).toString().split(" ");
    //console.log(newdate);
    return newdate[2] + '-' + newdate[1] + '-' + newdate[3];
}

function DaysDifference(firstDate, secondDate) {
    var startDay = new Date(firstDate);
    var endDay = new Date(secondDate);
    var millisBetween = startDay.getTime() - endDay.getTime();
    var days = millisBetween / (1000 * 3600 * 24);
    return Math.round(Math.abs(days));
}
