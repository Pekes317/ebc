import { IContactName, IContactField } from '@ionic-native/contacts/ngx';

export interface ShareInput {
  messText: string;
  show: boolean;
  ebcUrl: string;
  contacts?: IContactField[];
  name?: IContactName;
}

export interface UploadImg {
  img: string;
  opts: UploadOpts;
}

export interface UploadOpts {
  upload_preset: string;
  tags: Array<string>;
}
