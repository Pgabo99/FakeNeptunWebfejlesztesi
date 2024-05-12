import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'language'
})

export class languagePipe implements PipeTransform {
    transform(value: string,) {
        if (value == 'name')
            return 'Név';
        if (value == 'teacher')
            return 'Oktató';
        if (value == 'credit')
            return 'Kredit';
        return value;
    }
}