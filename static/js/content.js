

content_init = function()
{

    // function setTableHeight() {
    //     var windowHeight = $(window).height();
    //     var windowWidth = $(window).width();
    //     if(windowWidth > 768){
    //         var tableHeight = windowHeight - 500;
    //     } else {
    //         var tableHeight = windowHeight - 580;
    //     }
        
    //     $('#content').css('height', tableHeight + 'px');
    //     // console.log('table height : ', tableHeight);
    // }

    // // Set initial height
    // setTableHeight();

    // Adjust height on window resize

    $(document).ready(function(){
        $("#content_wrapper .dt-layout-row").eq(0).css({
            "position": "sticky",
            "top": "0px",
            "background": "#fff7f1",
            "z-index": "20",
        });
        $("#content_wrapper .dt-layout-row").eq(2).css({
            "position": "sticky",
            "bottom": "0px",
            "background": "#fff7f1",
            "z-index": "20",
        });
    });

    $(window).resize(function() {
        $("#content_wrapper .dt-layout-row").eq(0).css({
            "position": "sticky",
            "top": "0px",
            "background": "#fff7f1",
            "z-index": "20",
        });
        $("#content_wrapper .dt-layout-row").eq(2).css({
            "position": "sticky",
            "bottom": "0px",
            "background": "#fff7f1",
            "z-index": "20",
        });
    });

    var content_table = $('#content').DataTable({
        "ajax": {
            "url": pageRoot+"/api/content/?format=datatables", // Add your URL here
            "dataSrc": function (data) {
                var processedData=[]

                for(var c in data.data)
                {
                    processedData[c] = {}
                    for(var f in data.data[c])
                    {
                        processedData[c][f] = getPrintableValues(f,data.data[c][f]).value;
                    }
                }
                
                return processedData;
            },
            "data":
            {
                //"where_min": 12,
                //"where_max": 15
            }
        },
        "processing": false,
        "serverSide": true,
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pagingType": "full_numbers",
        "pageLength": 25,
        "show_column_filters": false,
        "columns": [

            { "data": "manuscript", "title": "Manuscript ID", "visible": false },
            { 
                "data": "manuscript_name", "title": "Manuscript Info",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    // console.log(oData);
                    let similardata = '';
                    if(oData.similarity_levenshtein_percent == '-' || oData.similarity_levenshtein_percent < '50' || !oData.similarity_levenshtein_percent){
                        similardata = 'red';
                    } else if(oData.similarity_levenshtein_percent > 99.99){
                        similardata = 'green';
                    } else {
                        similardata = '#a66b00';
                    }

                    let where_in_ms = oData.where_in_ms_from;
                    if(oData.where_in_ms_to != oData.where_in_ms_from)
                        where_in_ms+=" - "+oData.where_in_ms_to;

                    let html = "<h3 class='ms_name'>"+oData.manuscript_name+"</h3>"

                    +"<h3 class='formula_standarize'>Rite name from MS: <span class='formula_standarize_text'>"+oData.rite_name_from_ms+"</span></h3>"
                    +"<h3 class='formula_standarize'>Subrite name from MS: <span class='formula_standarize_text'>"+oData.subrite_name_from_ms+"</span></h3>"
                    +"<h3 class='formula_standarize'>Formula (standarized):<span class='formula_standarize_text'>"+oData.formula_standarized+"</span></h3>"
                    +"<h3 class='formula_standarize'>Formula (text from MS):<span class='formula_standarize_text'>"+oData.formula_text+"</span></h3>"


                    +"<div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2'>"
                    +"<div class='ms_contemporary_repository_place'><b>Where in MS : </b>"+where_in_ms+" - "+"</div>"
                    +"<div class='ms_main_script'><b>Subsection: </b>"+oData.subsection+"</div>"
                    +"<div class='ms_main_script'><b>Function / Genre: </b>"+oData.function+"</div>"
                    +"<div class='ms_dating'><b>Quire: </b>"+oData.quire+"</div>"
                    

                    +"<div class='ms_main_script'><b>Biblical reference: </b>"+oData.biblical_reference+"</div>"
                    +"<div class='ms_main_script'><b>Similarity (levenshtein): </b><span style='color:"+similardata+"'>"+ oData.similarity_levenshtein_percent +"%</span></div>"
                    +"<div class='ms_main_script'><b>Similarity (by user): </b>"+oData.similarity_by_user+"</div>"
                    +"<div class='ms_place_of_origins'><b>Sequence in MS: </b>"+oData.sequence_in_ms+"</div>"
                    +"<div class='ms_main_script'><b>Proper texts: </b>"+oData.proper_texts+"</div>"
                    
                    
                    +"<div class='ms_decorated'><b>Music Notation: </b><span class='decorated_right'>"+oData.music_notation+"</span></div>"
                    +"<div class='ms_main_script'><b>Subgenre: </b>"+oData.subfunction+"</div>"
                    +"<div class='ms_main_script'><b>Edition Index: </b>"+oData.edition_index+"</div>"
                    +"<div class='ms_main_script'><b>Edition Subindex: </b>"+oData.edition_subindex+"</div>"
                    +"<div class='ms_main_script'><b>Authors: </b>"+oData.authors+"</div>"
                    +"<div class='ms_how_many_quires'><b>Data contributor: </b><span class='decorated_right'>"+oData.data_contributor+"</span></div>"
                    +"</div>"
                    
                    ;

                    $(nTd).html(html);
            }},

            { "data": "manuscript_name", "title": "Manuscript" , searchable: false , "visible": false },
            { "data": "where_in_ms_from", "title": "Where in MS (from)" , "visible": false },
            { "data": "where_in_ms_to", "title": "Where in MS (to)" , "visible": false },
            { "data": "rite_name_from_ms", "title": "Rite name from MS" , "visible": false },
            { "data": "subsection", "title": "Subsection", searchable: false , "visible": false },
            { "data": "function", "title": "Function / Genre", searchable: false , "visible": false },
            { "data": "subfunction", "title": "Subgenre", searchable: false , "visible": false },
            { "data": "biblical_reference", "title": "Biblical reference", searchable: false , "visible": false },
            { "data": "formula_standarized", "title": "Formula (standarized)", searchable: false , "visible": false },
            { "data": "formula_text", "title": "Formula (text from MS)" , "visible": false },
            { 
                "data": "similarity_levenshtein_percent", 
                "title": "Similarity (levenshtein)",
                "render": function (data, type, row, meta) {
                    return row.similarity_levenshtein_percent + "%";
                },
                "createdCell": function(td, cellData, rowData, row, col) {
                    if(cellData == '-' || !cellData || cellData < 50)
                        $(td).css("color", "red");
                    else if( cellData > 99.9)
                        $(td).css("color", "green");
                    else
                        $(td).css("color", "#a66b00");
                },
                searchable: false, "visible": false
            },
            { "data": "similarity_by_user", "title": "Similarity (by user)", searchable: false , "visible": false },
            { "data": "original_or_added", "title": "Original or Added", "visible": false , searchable: false, "visible": false },
            { "data": "quire", "title": "Quire", searchable: false , "visible": false },
            { "data": "music_notation", "title": "Music Notation", searchable: false , "visible": false },


            { "data": "sequence_in_ms", "title": "Sequence in MS", searchable: false , "visible": false },

            { "data": "proper_texts", "title": "Proper texts", searchable: false , "visible": false },


            { "data": 'subrite_name_from_ms', "title": "Subrite name from MS", searchable: false , "visible": false },
            { "data": 'edition_index', "title": "Edition Index", searchable: false , "visible": false },
            { "data": 'edition_subindex', "title": "Edition Subindex", searchable: false , "visible": false },

            { "data": "authors", "title": "Authors", searchable: false , "visible": false },
            { "data": "data_contributor", "title": "Data contributor", searchable: false , "visible": false }
            // Add more columns as needed
        ],
        "createdRow": function(row, data, dataIndex) {
            if (data.original_or_added == "ORIGINAL") {
                $(row).addClass('medieval-row');
            } else if (data.original_or_added == "ADDED")  {
                $(row).addClass('non-medieval-row');
            }
        },
       
    });


    $('.manuscript_filter').select2({
        ajax: {
            url: pageRoot+'/manuscripts-autocomplete/',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
           }
            // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
          }
    });

    $('.manuscript_filter').on('select2:select', function (e) {
        var data = e.params.data;
        var id = data.id;
        console.log(id);

        content_table.columns(0).search(id).draw();

    });


    /*
    var whereInMsSlider = document.getElementById('where_in_ms_slider');

    noUiSlider.create(whereInMsSlider, {
        start: [0, 500],
        step: 0.5,
        connect: true,
        range: {
            'min': 0,
            'max': 500
        }

    });

    var whereInMsSliderValue = document.getElementById('where_in_ms_slider_value');

    whereInMsSlider.noUiSlider.on('update', function (values, handle) {
        whereInMsSliderValue.innerHTML = values[0] + ' - '+values[1];
    });


    var whereInMsSlider = document.getElementById('where_in_ms_slider');

    //check if need to apply filter:
    const min = whereInMsSlider.noUiSlider.options.range.min ;
    const max = whereInMsSlider.noUiSlider.options.range.max ; 
    
    const values = whereInMsSlider.noUiSlider.get(true);

    if(min != values[0] || max != values[1])
    {
        console.log('filter active!');
    }
    */

}