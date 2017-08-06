import { Project } from "../common/project";
import { Language } from "../common/language";

export class ModerationFilter {
  public project:Project = null;
  public language:Language = null;
  public list:boolean = true;

  toQuery():string{
    var query_arr:string[] = [];
    if(this.project !== null)
      query_arr.push('project='+this.project);

    if(this.language !== null)
      query_arr.push('language='+this.language);

    if(this.list === true)
      query_arr.push('list=1')

    return query_arr.join('&');
  };

  isSet(){
    return this.toQuery() != '';
  }
}