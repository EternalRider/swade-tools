import * as gb from './../gb.js';

export default class SettingRules extends FormApplication {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = "setting-rules-config";
        options.template = "modules/swade-tools/templates/setting-rules.html";
      
        options.width = 600;
        return options;
      }

     
      get title() {
        return gb.trans('settingRulesButton');
    }

    async getData(options){
        let data={};
        data.formHtml=``;

        gb.settingRules.map((value)=>{
            let confkey=gb.settingKey(value);
          //  data[confkey]= gb.setting(confkey);
          let checked='';
          if (gb.setting(confkey)){
              checked=' checked="checked" ';
          }

          console.log(confkey,gb.setting(confkey));

            data.formHtml+=`<div class="form-group">
            <label>${gb.trans(confkey)}</label>
            <div class="form-fields"><input type="checkbox" name="${confkey}" id="${confkey}" value="1" ${checked} /></div>
            </div>`;
        })



        return data
    }

      async _updateObject(event, formData) {
        for (let name in formData){
            let value=false;
            if (formData[name]){
                value=true;
            }
            game.settings.set(gb.moduleName,name,value);

            if(value && name==gb.settingKey('Hard Choices')){ /// disable Joker's Wild and GM benny=0
               

                new Dialog({
                    title: gb.trans(gb.settingKey('Hard Choices')),
                    content: `<p>${gb.trans('HardChoicesWarn')}</p>`,
                    buttons: {
                        ok: {
                            label: `<i class="fas fa-check"></i> ${gb.trans('Yes')}`,
                            callback: ()=>{
                                $('input[name="swade-tools.disableJokersWild"]').prop('checked',true) /// just to make sure is checked
                                game.settings.set(gb.moduleName,'disableJokersWild',true);
                                game.settings.set('swade','gmBennies',0);
                            }
                        },
                        cancel: {
                            label: `<i class="fas fa-times"></i> ${gb.trans('No')}`,
                            callback: () =>{

                            }
                        }
                    }
                }).render(true);

                //ui.notifications.warn(gb.trans('HardChoicesWarn'))
            }
        }



      }

}