from django.urls import path

# from . import views
from .views import createMenu, browseMenu, createStaffProfile, browseStaffProfile, stock, login, orderMenu, table, timeInfo

urlpatterns = [
    ### 1. 로그인
    # 1-2. 매니저 로그인 정보 입력
    path('manager/login/', login.loginManager),
    # 1-2. 직원 로그인 정보 입력
    path('staff/login/', login.loginStaff),
    # 1-3. 직원 PW 찾기
    path('findPW/', login.findPW),

    ### 3. 직원 프로필 생성
    path('createStaffProfile/', createStaffProfile.create),

    ### 4. 직원 프로필 열람/수정
    # 4-1. 프로필 목록
    path('browseStaffProfile/', browseStaffProfile.browse),
    # 4-2. 프로필 정보 열람
    path('detailStaffProfile/', browseStaffProfile.detail),
    # 4-3. 프로필 정보 수정
    path('modifyStaffProfile/', browseStaffProfile.modify),
    #추가) 프로필 정보 삭제
    path('deleteStaffProfile/', browseStaffProfile.delete),

    ### 5. 메뉴 등록
    path('createMenu/', createMenu.createMenu),

    ### 6. 메뉴 열람/수정
    # 6-1. 메뉴 목록
    path('browseMenu/', browseMenu.browseMenu),
    # 6-2. 메뉴 정보 열람
    path('getSelectedMenu/', browseMenu.getSelectedMenu),
    # 6-3. 메뉴 정보 수정
    path('modifyMenu/', browseMenu.modifyMenu),
    #추가) 메뉴 정보 삭제
    path('deleteMenu/', browseMenu.deleteMenu),

    ### 7. 시간 정보 열람
    path('browseTimeInfo/', timeInfo.browse),

    ### 9. 재고 추적
    # 9-1. 재고 현황
    path('browseStock/', stock.browse),
    # 9-2. 재고 등록
    path('createStock/', stock.create),
    # 9-3. 재고 정보 열람
    path('detailStock/', stock.detail),
    # 9-4. 재고 정보 수정
    path('modifyStock/', stock.modify),
    #추가) 재고 정보 삭제
    path('deleteStock/', stock.delete),

    ### 10. 재고 주문
    # 10-1. 주문할 재고와 수량 선택
    path('orderStock/', stock.orderStock),
    # 10-2. 주문할 재고 정보 확인
    path('finishStock/', stock.finishStock),

    ### 11. 메뉴 주문
    # 11-1. 메뉴 선택
    path('showMenu/', orderMenu.showMenu),
    # 11-. 
    path('orderMenu/', orderMenu.orderMenu),
    # 11-.
    path('finishMenu/', orderMenu.finishMenu),
    # 11-2. 매장 식사 선택 시 테이블 선택
    path('orderTable/', orderMenu.orderTable),

    ### 13. 테이블 관리
    # 13-1. 현재 테이블 목록 확인
    path('showTable/', table.showTable),
    # 13-2. 테이블 별 정보 열람
    path('detailTable/', table.detailTable),

]
