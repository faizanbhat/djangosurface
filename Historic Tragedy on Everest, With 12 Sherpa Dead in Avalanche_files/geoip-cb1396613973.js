(function(){
    var script,
    TRANSLATE;
    
    //Assign variables
    TRANSLATE={
        'GB':{
            "/magazines/lp/nav/":"/magazines/lp/nav-uk/",
            "/travel/traveler-magazine/":"http://natgeotraveller.co.uk/",
            "/kids/":"http://ngkids.co.uk/",
            "https://secure.customersvc.com/servlet/Show?WESPAGE=OrderPages/ng/1305/landing_05A1.jsp&MSRSMAG=NG&EFK1=NGB7W98&EFK2=NGB7XA4&EFK3=NGB7XB2&MSCCMPLX=RBMULTINV3&FNPRT=15":"https://secure.customersvc.com/servlet/Show?WESPAGE=OrderPages/nf/1304/order_29A1.jsp&MSRSMAG=NF&EFK1=NFCMR02&EFK2=NFCMR10&EFK3=NFCMR28&MSCCMPLX=RBMULTINV3",
            "https://secure.customersvc.com/servlet/Show?WESPAGE=OrderPages/ngk/1310/landing_01A3.jsp&MSRSMAG=WO&EFK1=WOALVF6&EFK2=&EFK3=&MSCCMPLX=FLYOUT7":"https://natgeokid.subscribeonline.co.uk/",
            "https://secure.customersvc.com/servlet/Show?WESPAGE=OrderPages/tr/1311/landing_15A1.jsp&MSRSMAG=TR&EFK1=TRAJ5G5&EFK2=TRAJ5H3&EFK3=TRAJ5J8&MSCCMPLX=FLYOUT7":"http://natgeotraveller.co.uk/subscribe/",
            "http://shop.nationalgeographic.com/ngs/index.jsp?code=NG94000&amp;source=NavShopHome":"http://www.shopnatgeo.co.uk/",
            "http://shop.nationalgeographic.com/ngs/index.jsp?code=NG94000&source=NavShopHome":"http://www.shopnatgeo.co.uk/",
            "//kids.nationalgeographic.com/kids/":"http://ngkids.co.uk/",
            "http://www.nationalgeographic.com/magazines/":"https://natgeokid.subscribeonline.co.uk/"
        }
    };

    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://j.maxmind.com/app/country.js";
    document.getElementsByTagName("html")[0].appendChild(script);
    $(script).load(function(){
        window.internationalize_links=function(){
            var elements = $('.geoip:not(.geoip-processed)'),
                element,
                index = 0,
                length = elements.length,
                country=typeof(geoip_country_code) === 'function' && geoip_country_code() || 'US';
                
            for(index;index<length;index+=1){
                element=elements[index];
                translate_link(country, $(element));
            }
        };
        $("body").trigger("geoip");
    });

    function translate_link(country, $element){
        var i_href,
            original_href=$element.attr("href"),
            pathname=$element[0].pathname,
            killflyoff=$element.data("killflyoff"),
            killspotlight=$element.data("killspotlight"),
            transform=$element.data("transform");

        if(country in TRANSLATE){
            i_href=TRANSLATE[country][original_href];
            if(!i_href){
                i_href=TRANSLATE[country][pathname];
            }
        }

        if(i_href){
            $element.attr("href", i_href);

            if(killflyoff){
                kill_flyoff($element);
            }
        }
        if(country==="GB"){
            if(transform){
                transform_link($element);
            }
            if(killspotlight){
                kill_spotlight($element);
            }
        }
        
        $element.addClass("geoip-processed");

    };

    function kill_flyoff($element){
        $element.parent().addClass("no-flyoff");
    };

    function kill_spotlight($element){
        var $sub_nav=$element.find("nav.sub_nav");
        $sub_nav.addClass("no-spotlight");
    };

    function transform_link($element){
        $element.html("<span>UK SITE</span>");
        $element.attr("href","http://www.nationalgeographic.com/uk/");
        $element.attr("title","UK Site");
        $element.removeData("transform");
    };
})();


function init_internationalize(){
    if(window.internationalize_links){
        window.internationalize_links();
    }else{
        $("body").on("geoip",function(){
            window.internationalize_links();
        });
    }
}
try {
    init_internationalize();
} catch(e) {

}



