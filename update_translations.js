const fs = require('fs');

function replaceInFile(file, replacements) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    for (let r of replacements) {
        content = content.split(r.search).join(r.replace);
    }
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated ' + file);
    }
}

// 1. Update index.html specifically
let indexReplacements = [
    {
        search: '<h3 class="text-xl font-bold text-gray-800">الرضاعة الطبيعية</h3>',
        replace: '<h3 class="text-xl font-bold text-gray-800" data-i18n="additional_features.breastfeeding_title">الرضاعة الطبيعية</h3>'
    },
    {
        search: '<p class="text-gray-600 mb-4">تقنيات الرضاعة الصحيحة والمشاكل الشائعة وكيفية التعامل معها</p>',
        replace: '<p class="text-gray-600 mb-4" data-i18n="additional_features.breastfeeding_desc">تقنيات الرضاعة الصحيحة والمشاكل الشائعة وكيفية التعامل معها</p>'
    },
    {
        search: 'التفاصيل <i',
        replace: '<span data-i18n="additional_features.details">التفاصيل</span> <i'
    },
    {
        search: '<h3 class="text-xl font-bold text-gray-800">السلامة والأمان</h3>',
        replace: '<h3 class="text-xl font-bold text-gray-800" data-i18n="additional_features.safety_title">السلامة والأمان</h3>'
    },
    {
        search: '<p class="text-gray-600 mb-4">إجراءات السلامة، النوم الآمن، وتجنب المخاطر المنزلية</p>',
        replace: '<p class="text-gray-600 mb-4" data-i18n="additional_features.safety_desc">إجراءات السلامة، النوم الآمن، وتجنب المخاطر المنزلية</p>'
    },
    {
        search: '<h3 class="text-xl font-bold text-gray-800">جدول المتابعة</h3>',
        replace: '<h3 class="text-xl font-bold text-gray-800" data-i18n="additional_features.followup_title">جدول المتابعة</h3>'
    },
    {
        search: '<p class="text-gray-600 mb-4">مواعيد الزيارات الطبية والفحوصات الدورية للأشهر الستة الأولى</p>',
        replace: '<p class="text-gray-600 mb-4" data-i18n="additional_features.followup_desc">مواعيد الزيارات الطبية والفحوصات الدورية للأشهر الستة الأولى</p>'
    },
    {
        search: 'حالات الطوارئ',
        replace: '<span data-i18n="emergency_section.title\">حالات الطوارئ</span>'
    },
    {
        search: 'تعرفي على علامات الخطر التي تتطلب استشارة طبية فورية',
        replace: '<span data-i18n="emergency_section.subtitle">تعرفي على علامات الخطر التي تتطلب استشارة طبية فورية</span>'
    },
    {
        search: '<p class="font-medium text-gray-800">ارتفاع درجة الحرارة</p>',
        replace: '<p class="font-medium text-gray-800" data-i18n="emergency_section.fever">ارتفاع درجة الحرارة</p>'
    },
    {
        search: '<p class="text-sm text-gray-600">أعلى من 38°C</p>',
        replace: '<p class="text-sm text-gray-600" data-i18n="emergency_section.fever_desc">أعلى من 38°C</p>'
    },
    {
        search: '<p class="font-medium text-gray-800">صعوبة في التنفس</p>',
        replace: '<p class="font-medium text-gray-800" data-i18n="emergency_section.breathing">صعوبة في التنفس</p>'
    },
    {
        search: '<p class="text-sm text-gray-600">تنفس سريع أو صعوبة</p>',
        replace: '<p class="text-sm text-gray-600" data-i18n="emergency_section.breathing_desc">تنفس سريع أو صعوبة</p>'
    },
    {
        search: '<p class="font-medium text-gray-800">الجفاف الشديد</p>',
        replace: '<p class="font-medium text-gray-800" data-i18n="emergency_section.dehydration">الجفاف الشديد</p>'
    },
    {
        search: '<p class="text-sm text-gray-600">جفاف الفم، قلة التبول</p>',
        replace: '<p class="text-sm text-gray-600" data-i18n="emergency_section.dehydration_desc">جفاف الفم، قلة التبول</p>'
    },
    {
        search: '<p class="font-medium text-gray-800">خمول شديد</p>',
        replace: '<p class="font-medium text-gray-800" data-i18n="emergency_section.lethargy">خمول شديد</p>'
    },
    {
        search: '<p class="text-sm text-gray-600">عدم الاستجابة</p>',
        replace: '<p class="text-sm text-gray-600" data-i18n="emergency_section.lethargy_desc">عدم الاستجابة</p>'
    },
    {
        search: '<h3 class="text-xl font-bold mb-2">طوارئ طبية</h3>',
        replace: '<h3 class="text-xl font-bold mb-2" data-i18n="emergency_section.medical_emergency">طوارئ طبية</h3>'
    },
    {
        search: '<p class="text-sm">اتصلي فوراً في الحالات الطارئة</p>',
        replace: '<p class="text-sm" data-i18n="emergency_section.call_now">اتصلي فوراً في الحالات الطارئة</p>'
    },
    {
        search: 'مصادر موثوقة',
        replace: '<span data-i18n="resources_section.title">مصادر موثوقة</span>'
    },
    {
        search: 'معلوماتنا معتمدة من مصادر طبية عالمية',
        replace: '<span data-i18n="resources_section.subtitle">معلوماتنا معتمدة من مصادر طبية عالمية</span>'
    },
    {
        search: '<h3 class="text-xl font-bold text-gray-800 mb-3">منظمة الصحة العالمية</h3>',
        replace: '<h3 class="text-xl font-bold text-gray-800 mb-3" data-i18n="resources_section.who_title">منظمة الصحة العالمية</h3>'
    },
    {    
        search: '<p class="text-gray-600 mb-4">WHO - التوصيات العالمية لرعاية الأطفال</p>',
        replace: '<p class="text-gray-600 mb-4" data-i18n="resources_section.who_desc">WHO - التوصيات العالمية لرعاية الأطفال</p>'
    },
    {
        search: 'زيارة الموقع <i',
        replace: '<span data-i18n="resources_section.visit_site">زيارة الموقع</span> <i'
    },
    {
        search: '<h3 class="text-xl font-bold text-gray-800 mb-3">الأكاديمية الأمريكية</h3>',
        replace: '<h3 class="text-xl font-bold text-gray-800 mb-3" data-i18n="resources_section.aap_title">الأكاديمية الأمريكية</h3>'
    },
    {    
        search: '<p class="text-gray-600 mb-4">AAP - إرشادات طب الأطفال المعتمدة</p>',
        replace: '<p class="text-gray-600 mb-4" data-i18n="resources_section.aap_desc">AAP - إرشادات طب الأطفال المعتمدة</p>'
    },
    {
        search: '<h3 class="text-xl font-bold text-gray-800 mb-3">اليونيسف</h3>',
        replace: '<h3 class="text-xl font-bold text-gray-800 mb-3" data-i18n="resources_section.unicef_title">اليونيسف</h3>'
    },
    {    
        search: '<p class="text-gray-600 mb-4">UNICEF - دعم صحة الطفل والأم</p>',
        replace: '<p class="text-gray-600 mb-4" data-i18n="resources_section.unicef_desc">UNICEF - دعم صحة الطفل والأم</p>'
    },
    {
        search: 'حقائق وأرقام',
        replace: '<span data-i18n="statistics_section.title">حقائق وأرقام</span>'
    },
    {
        search: 'معلومات مهمة عن رعاية الرضع',
        replace: '<span data-i18n="statistics_section.subtitle">معلومات مهمة عن رعاية الرضع</span>'
    },
    {
        search: '<p class="text-gray-600">وفيات الأطفال يمكن تجنبها سنوياً</p>',
        replace: '<p class="text-gray-600" data-i18n="statistics_section.avoidable_deaths">وفيات الأطفال يمكن تجنبها سنوياً</p>'
    },
    {
        search: '<p class="text-gray-600">فعالية الرضاعة الطبيعية في الحماية</p>',
        replace: '<p class="text-gray-600" data-i18n="statistics_section.breastfeeding_efficacy">فعالية الرضاعة الطبيعية في الحماية</p>'
    },
    {
        search: '<p class="text-gray-600">تغطية التطعيمات العالمية</p>',
        replace: '<p class="text-gray-600" data-i18n="statistics_section.vaccination_coverage">تغطية التطعيمات العالمية</p>'
    },
    {
        search: '<p class="text-gray-600">تقليل وفيات المهد بوضعيات النوم الآمنة</p>',
        replace: '<p class="text-gray-600" data-i18n="statistics_section.sids_reduction">تقليل وفيات المهد بوضعيات النوم الآمنة</p>'
    }
];

replaceInFile('index.html', indexReplacements);

// 2. Update footer in all files
let allFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let sharedReplacements = [
    {
        search: '<h3 class="text-xl font-bold mb-4">رعاية الرضيع</h3>',
        replace: '<h3 class="text-xl font-bold mb-4" data-i18n="footer.site_name">رعاية الرضيع</h3>'
    },
    {
        search: 'دليل شامل وموثوق للأمهات لرعاية الأطفال حديثي الولادة في الأشهر الستة الأولى.',
        replace: '<span data-i18n="footer.site_desc">دليل شامل وموثوق للأمهات لرعاية الأطفال حديثي الولادة في الأشهر الستة الأولى.</span>'
    },
    {
        search: '<h3 class="text-xl font-bold mb-4">روابط سريعة</h3>',
        replace: '<h3 class="text-xl font-bold mb-4" data-i18n="footer.quick_links">روابط سريعة</h3>'
    },
    {
        search: '<h3 class="text-xl font-bold mb-4">اتصل بنا</h3>',
        replace: '<h3 class="text-xl font-bold mb-4" data-i18n="footer.contact_us">اتصل بنا</h3>'
    },
    {
        search: 'الطوارئ: 123',
        replace: '<span data-i18n="footer.emergency">الطوارئ: 123</span>'
    },
    {
        search: '<span class="text-gray-300">مصر</span>',
        replace: '<span class="text-gray-300" data-i18n="footer.country">مصر</span>'
    },
    {
        search: '<span>جميع الحقوق محفوظة</span>',
        replace: '<span data-i18n="footer.rights">جميع الحقوق محفوظة</span>'
    },
    {
        search: 'جميع الحقوق محفوظة ©',
        replace: '<span data-i18n="footer.rights\">جميع الحقوق محفوظة</span> ©'
    },
    {
        search: '<span>مصمم بعناية وحب للأمهات والأطفال</span>',
        replace: '<span data-i18n="footer.designed_by">مصمم بعناية وحب للأمهات والأطفال</span>'
    },
    {
        search: 'رعاية الرضيع | مصمم بعناية وحب للأمهات والأطفال',
        replace: '<span data-i18n="footer.designed_by">رعاية الرضيع | مصمم بعناية وحب للأمهات والأطفال</span>'
    },
    {
        search: '<a href="vaccination.html" class="text-gray-300 hover:text-white transition duration-300">التطعيمات</a>',
        replace: '<a href="vaccination.html" class="text-gray-300 hover:text-white transition duration-300" data-i18n="nav.vaccination">التطعيمات</a>'
    },
    {
        search: '<a href="vaccination.html" class="text-gray-400 hover:text-white transition">التطعيمات</a>',
        replace: '<a href="vaccination.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.vaccination">التطعيمات</a>'
    },
    {
        search: '<a href="diseases.html" class="text-gray-300 hover:text-white transition duration-300">الأمراض</a>',
        replace: '<a href="diseases.html" class="text-gray-300 hover:text-white transition duration-300" data-i18n="nav.diseases">الأمراض</a>'
    },
    {
        search: '<a href="diseases.html" class="text-gray-400 hover:text-white transition">الأمراض</a>',
        replace: '<a href="diseases.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.diseases">الأمراض</a>'
    },
    {
        search: '<a href="growth.html" class="text-gray-300 hover:text-white transition duration-300">النمو والتطور</a>',
        replace: '<a href="growth.html" class="text-gray-300 hover:text-white transition duration-300" data-i18n="nav.growth">النمو والتطور</a>'
    },
    {
        search: '<a href="growth.html" class="text-gray-400 hover:text-white transition">النمو والتطور</a>',
        replace: '<a href="growth.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.growth">النمو والتطور</a>'
    },
    {
        search: '<a href="care.html" class="text-gray-300 hover:text-white transition duration-300">الرعاية اليومية</a>',
        replace: '<a href="care.html" class="text-gray-300 hover:text-white transition duration-300" data-i18n="nav.care">الرعاية اليومية</a>'
    },
    {
        search: '<a href="care.html" class="text-gray-400 hover:text-white transition">الرعاية اليومية</a>',
        replace: '<a href="care.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.care">الرعاية اليومية</a>'
    },
    {
        search: '<a href="breastfeeding.html" class="text-gray-300 hover:text-white transition duration-300">الرضاعة الطبيعية</a>',
        replace: '<a href="breastfeeding.html" class="text-gray-300 hover:text-white transition duration-300" data-i18n="nav.breastfeeding">الرضاعة الطبيعية</a>'
    },
    {
        search: '<a href="breastfeeding.html" class="text-gray-400 hover:text-white transition">الرضاعة الطبيعية</a>',
        replace: '<a href="breastfeeding.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.breastfeeding">الرضاعة الطبيعية</a>'
    },
    {
        search: '<a href="safety.html" class="text-gray-300 hover:text-white transition duration-300">السلامة</a>',
        replace: '<a href="safety.html" class="text-gray-300 hover:text-white transition duration-300" data-i18n="nav.safety">السلامة</a>'
    },
    {
        search: '<a href="safety.html" class="text-gray-400 hover:text-white transition">السلامة</a>',
        replace: '<a href="safety.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.safety">السلامة</a>'
    },
    {
        search: '<a href="followup.html" class="text-gray-300 hover:text-white transition duration-300">المتابعة</a>',
        replace: '<a href="followup.html" class="text-gray-300 hover:text-white transition duration-300" data-i18n="nav.followup">المتابعة</a>'
    },
    {
        search: '<a href="followup.html" class="text-gray-400 hover:text-white transition">المتابعة</a>',
        replace: '<a href="followup.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.followup">المتابعة</a>'
    },
    {
        search: '<a href="index.html" class="text-gray-300 hover:text-white transition duration-300">الرئيسية</a>',
        replace: '<a href="index.html" class="text-gray-300 hover:text-white transition duration-300" data-i18n="nav.home">الرئيسية</a>'
    },
    {
        search: '<a href="index.html" class="text-gray-400 hover:text-white transition">الرئيسية</a>',
        replace: '<a href="index.html" class="text-gray-400 hover:text-white transition" data-i18n="nav.home">الرئيسية</a>'
    }
];

allFiles.forEach(file => {
   replaceInFile(file, sharedReplacements);
});
