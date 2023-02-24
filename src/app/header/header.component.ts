import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    menuType: string = 'default';
    sellerName:string = '';
   searchResult : undefined | product[];
   userName: string="";
  route: any;

   constructor(private router: Router, private product: ProductService){ }

    ngOnInit(): void {
      
      this.router.events.subscribe((val:any) => {
        // console.warn(val.url)
      
        if(val.url){
          // console.warn(val.url)
          if(localStorage.getItem('seller') && val.url.includes('seller')){
            // console.warn('in seller area');
            // this.menuType='seller';

            // if(localStorage.getItem('seller')){
              let sellerStore = localStorage.getItem('seller');
              let sellerData = sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName = sellerData.name;
              this.menuType = 'seller';
            
          }else if (localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore)[0];
            this.userName = userData.name;
            this.menuType = 'user';
          }else{
           this.menuType = 'default'
          }
        }
      })
    }

    logout(){
      localStorage.removeItem('seller');
      this.router.navigate(['/']);
    }
    userLogout(){
      localStorage.removeItem('user');
      this.router.navigate(['/user-auth']);
    }

    searchProduct(query:KeyboardEvent){
      if(query){
        const element = query.target as HTMLInputElement;
        // console.warn(element.value);
        this.product.searchProducts(element.value).subscribe((result) => {
        //  console.warn(result);
         if(result.length>5){
          result.length=5;
         }
         this.searchResult = result;
        })
      
      }
    }

    hideSearch(){
      this.searchResult=undefined
    }

    redirectToDetails(id:number){
      this.route.navigate(['/details/'+id])
    }

    submitSearch(val:string){
      // console.warn(val);
      this.router.navigate([`search/${val}`])
      
    }
}
