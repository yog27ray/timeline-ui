import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  categories: Array<{ name: string; value: string, icon: string }> = [
    { name: 'Customer', value: 'Customer', icon: 'fa-mobile' },
    { name: 'Team', value: 'Team', icon: 'fa-people-arrows' },
    { name: 'Business', value: 'Business', icon: 'fa-briefcase' },
    { name: 'Marketing', value: 'Marketing', icon: 'fa-magnifying-glass-dollar' },
    { name: 'Milestone', value: 'Milestone', icon: 'fa-trophy' },
    { name: 'Developer', value: 'Developer', icon: 'fa-rocket' },
    { name: 'Announcement', value: 'Announcement', icon: 'fa-bullhorn' },
  ];
  categoryIconMap: Record<string, string> = this.categories.reduce((result_: Record<string, string>, each) => {
    const result = result_;
    result[each.value] = each.icon;
    return result;
  }, {});
}
